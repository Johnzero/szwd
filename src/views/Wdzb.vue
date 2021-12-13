<template>
    <div>
        <div id="map"></div>
        <ul class="buttons">
            <li v-for="(row, index) in icons" :key="index">
                <a @click="showPos(row.type, index)"><img :src="row.icon" /></a>
            </li>
        </ul>
        <div v-drag v-show="showinfo" class="biginfo">
            <div class="biginfoinner">
                <swiper ref="mySwiper" :options="swiperOptions">
                    <div class="swiper-slide" :key="banner" v-for="banner in banners">
                        <img :src="banner" />
                    </div>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="infocontent">
                    <div class="infotitle">
                        栖霞寺
                        <div class="videoImg" @click="showvideo = true">
                            <img :src="videoImg" />
                        </div>
                    </div>
                    <p>
                        “春牛首，秋栖霞”，南京人对于栖霞山的热爱可见一斑，或许是乾隆六下江南，五次驻足栖霞山，让这座金陵第一名秀山更添神圣。迄今已有
                        1500 多年历史的栖霞寺 ，
                        是中国四大名刹之一，每到秋季，在红枫交融间的栖霞寺，更显满满的禅意，深秋的栖霞寺。寻个好天气，约上小伙伴去栖霞寺烧香祈福，虔诚的许下愿望也是极好的！
                    </p>
                </div>
            </div>
            <a onclick="handleHide()" class="infoclose">
                <img src="/close.png" />
            </a>
        </div>
        <div v-drag v-show="showvideo" class="videoBlock">
            <div class="demo">
                <video-player
                    @play="showPlay = false"
                    @pause="showPlay = true"
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                >
                </video-player>
            </div>
            <img
                v-show="showPlay"
                @click="playButton"
                class="playButton"
                src="~@/assets/play.png"
            />
            <a @click="hideVideo" class="infoclose">
                <img src="/close.png" />
            </a>
        </div>
    </div>
</template>

<script>
// import { swiper, swiperslide, directive } from "vue-awesome-swiper";
// import "swiper/css/swiper.css";

export default {
    name: "Wdzb",
    components: {},
    data() {
        return {
            marker: {},
            menus: [],
            map: {},
            center: {},
            infoWindow: {},
            showinfo: false,
            showvideo: false,
            showPlay: true,
            playerOptions: {
                autoplay: false,
                muted: false,
                loop: false,
                preload: "false",
                language: "zh-CN",
                aspectRatio: "16:9",
                fluid: true,
                sources: [
                    {
                        type: "video/mp4",
                        src:
                            "http://dashboard.app.anhuiyun.com/storage/app/media/vedios/de4aee7e01264083985853677f67b173.mp4",
                    },
                ],
                poster: "",
                notSupportedMessage: "此视频暂无法播放，请稍后再试",
                controlBar: {
                    timeDivider: false,
                    durationDisplay: false,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true,
                },
            },
            videoImg: require("../assets/qxs.png"),
            banners: ["https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/em.jpg"],
            icons: [
                { type: "j", icon: require("../assets/j1.png") },
                { type: "g", icon: require("../assets/g1.png") },
                { type: "ju", icon: require("../assets/jb1.png") },
                { type: "s", icon: require("../assets/s1.png") },
                { type: "d", icon: require("../assets/d1.png") },
            ],
            activeIcons: [
                require("../assets/j.png"),
                require("../assets/g.png"),
                require("../assets/jb.png"),
                require("../assets/s.png"),
                require("../assets/d.png"),
            ],
            geometries: [
                {
                    id: 1,
                    styleId: "j",
                    position: new TMap.LatLng(39.97912, 116.30563),
                    content: "白家大院",
                },
                {
                    id: 2,
                    styleId: "d",
                    position: new TMap.LatLng(39.97812, 116.30563),
                    content: "白家大院2",
                },
            ],
            swiperOptions: {
                slidesPerView: 1,
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction",
                },
            },
        };
    },
    directives: {
        drag(el, bindings) {
            let oDiv = el;
            let self = this;
            document.onselectstart = function () {
                return false;
            };
            oDiv.onmousedown = function (e) {
                //鼠标按下，计算当前元素距离可视区的距离
                let disX = e.clientX - oDiv.offsetLeft;
                let disY = e.clientY - oDiv.offsetTop;
                document.onmousemove = function (e) {
                    //通过事件委托，计算移动的距离
                    let l = e.clientX - disX;
                    let t = e.clientY - disY;
                    //移动当前元素
                    oDiv.style.left = l + "px";
                    oDiv.style.top = t + "px";
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
                return false;
            };
        },
    },
    mounted() {
        let that = this;
        this.$axios
            .get("app.ashx?action=Getjingdian")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        window.handleHide = this.handleHide;
        sessionStorage.setItem("geometries", JSON.stringify(this.geometries));
        this.initMap();
    },
    methods: {
        hideVideo() {
            this.$refs.videoPlayer.player.pause();
            this.showvideo = false;
        },
        playButton() {
            this.$refs.videoPlayer.player.play();
            this.showPlay = false;
        },
        createMarker() {
            let that = this;
            this.marker = new TMap.MultiMarker({
                map: this.map, // 显示Marker图层的底图
                styles: {
                    j: new TMap.MarkerStyle({
                        width: parseInt(80 / 4),
                        height: parseInt(98 / 4),
                        // anchor: { x: 80 / 4, y: 98 / 4 }, // 标注点图片的锚点位置
                        src: require("../assets/j_pos.png"),
                        color: "#317B73",
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                    g: new TMap.MarkerStyle({
                        width: parseInt(80 / 4),
                        height: parseInt(98 / 4),
                        src: require("../assets/g_pos.png"),
                        color: "#317B73",
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                    ju: new TMap.MarkerStyle({
                        width: parseInt(80 / 4),
                        height: parseInt(98 / 4),
                        src: require("../assets/ju_pos.png"),
                        color: "#317B73",
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                    s: new TMap.MarkerStyle({
                        width: parseInt(80 / 4),
                        height: parseInt(98 / 4),
                        src: require("../assets/s_pos.png"),
                        color: "#317B73",
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                    d: new TMap.MarkerStyle({
                        width: parseInt(80 / 4),
                        height: parseInt(98 / 4),
                        src: require("../assets/d_pos.png"),
                        color: "#317B73",
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                },
                enableCollision: false,
                geometries: that.geometries,
            });
            this.marker.on("click", this.markerClick);
        },
        handleHide() {
            this.infoWindow.close();
            this.showinfo = false;
            this.$refs.videoPlayer.player.pause();
        },
        markerClick(evt) {
            var iC = `
                <div class="infowindow">
                    <div class="infoinner">
                        <img src="https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/em.jpg">
                        <div class="infocontent">
                            <div class="infotitle">栖霞寺</div>
                            <p>详细地址：栖霞区栖霞山山门外</p>
                        </div>
                    </div>
                    <a onclick="handleHide()" class="infoclose">
                        <img src="/close.png" />
                    </a>
                </div>
            `;
            this.infoWindow.setPosition(evt.geometry.position);
            this.infoWindow.setContent(iC);
            this.infoWindow.open();
            this.showinfo = true;
        },
        showPos(type, v) {
            var activeImg = [
                { type: "j", icon: require("../assets/j1.png") },
                { type: "g", icon: require("../assets/g1.png") },
                { type: "ju", icon: require("../assets/jb1.png") },
                { type: "s", icon: require("../assets/s1.png") },
                { type: "d", icon: require("../assets/d1.png") },
            ];
            this.icons = activeImg;
            this.icons[v].icon = this.activeIcons[v];
            var geometries = sessionStorage.getItem("geometries");
            geometries = JSON.parse(geometries);
            var fileterGeo = geometries.filter((item) => item.styleId == type);
            this.marker.setMap(null);
            this.marker = null;
            this.geometries = fileterGeo;
            this.createMarker();
        },
        initMap() {
            this.center = new TMap.LatLng(32.058228, 118.791178);
            var map;
            this.map = map = new TMap.Map(document.getElementById("map"), {
                center: this.center,
                doubleClickZoom: false,
                mapStyleId: "style1",
                zoom: 15, // 设置地图缩放级别
                // pitch: 43.5, // 设置俯仰角
                // rotation: 45, // 设置地图旋转角度
                pitch: 0,
                rotation: 0,
            });
            this.createMarker();

            new TMap.MultiMarker({
                map: this.map,
                styles: {
                    wxkq: new TMap.MarkerStyle({
                        width: parseInt(297 / 4),
                        height: parseInt(267 / 4),
                        src: require("../assets/sjwxkt.png"),
                    }),
                },
                enableCollision: false,
                geometries: [
                    {
                        id: "wxkq",
                        styleId: "wxkq",
                        position: this.center,
                    },
                ],
            });

            this.infoWindow = new TMap.InfoWindow({
                map: this.map,
                position: this.center,
                enableCustom: true,
                content: "<div></div>",
            });
            this.infoWindow.close();
        },
    },
};
</script>
<style scoped>
.buttons {
    width: calc(1110px / 4);
    padding: 0;
    margin-left: 3%;
    position: absolute;
    bottom: 8%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 99999;
    text-align: center;
}
.buttons li {
    display: inline-block;
    list-style: none;
    width: calc(210px / 4);
    height: calc(210px / 4);
    margin: 0;
}
.buttons li a,
.buttons li img {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
<style>
.infowindow {
    width: calc(540px / 4);
    min-height: calc(567px / 4);
    border-radius: calc(30px / 4);
    background: url("~@/assets/info.png") no-repeat;
    background-size: 100% 100%;
    box-shadow: 5px 5px 5px rgb(38 22 22 / 25%);
    padding: calc(20px / 4);
}
.infoinner {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 5%;
}
.infocontent {
    padding: calc(20px / 4);
}
.infotitle {
    font-size: calc(32px / 4);
    font-weight: bold;
    padding-bottom: calc(10px / 4);
    margin-bottom: calc(10px / 4);
    border-bottom: 1px solid #dedede;
}
.infocontent p {
    font-size: calc(24px / 4);
}
.infowindow img {
    width: 100%;
    border-top-left-radius: 5%;
    border-top-right-radius: 5%;
}

.biginfo {
    width: calc(960px / 4);
    min-height: calc(800px / 4);
    max-height: 90%;
    background: url("~@/assets/infobg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: calc(30px / 4);
    box-shadow: 5px 5px 5px #c3c3c3;
    padding: calc(40px / 4);
    position: absolute;
    z-index: 99999;
    right: 10%;
    top: 20%;
}
.biginfoinner {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 5%;
}
.biginfocontent {
    padding: calc(20px / 4);
    overflow-y: scroll;
}
.infoclose img {
    width: 100%;
}
.swiper-container {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.swiper-slide img {
    width: 100%;
}
.swiper-pagination {
    color: white;
    background: black;
    width: calc(160px / 4);
    border-radius: calc(40px / 4);
    font-size: calc(48px / 4);
    right: 1%;
    bottom: 1%;
    left: inherit;
}
.videoImg {
    width: calc(64px / 4);
    height: calc(55px / 4);
    float: right;
}
.videoImg img {
    width: 100%;
    height: 100%;
}

.videoBlock {
    width: calc(960px / 4);
    background: url("~@/assets/infobg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: calc(30px / 4);
    box-shadow: 5px 5px 5px #c3c3c3;
    padding: calc(40px / 4);
    position: absolute;
    z-index: 99999;
    right: calc(12% + 960px / 4);
    top: 20%;
}
.video-js .vjs-big-play-button {
    display: none !important;
}
.playButton {
    width: calc(93px / 4);
    height: calc(93px / 4);
    z-index: 9999999;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% - 93px / 2 / 4);
}
</style>
