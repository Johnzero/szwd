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
                    <div class="swiper-slide" :key="banner.id" v-for="banner in banners">
                        <img :src="banner.original_path" />
                    </div>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="infocontent">
                    <div class="infotitle">
                        {{ infotitle }}
                        <div v-show="shipin" class="videoImg" @click="showvideoclick">
                            <img :src="videoImg" />
                        </div>
                    </div>
                    <div v-html="infocontent"></div>
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
            center: new TMap.LatLng(32.058228, 118.791178),
            infoWindow: {},
            infotitle: "",
            infocontent: "",
            showinfo: false,
            showvideo: false,
            showPlay: true,
            shipin: "",
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
                        src: "",
                    },
                ],
                poster: "",
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
                { type: "j", icon: require("../assets/j1.png"), id: "52" },
                { type: "g", icon: require("../assets/g1.png"), id: "71" },
                { type: "ju", icon: require("../assets/jb1.png"), id: "53" },
                { type: "s", icon: require("../assets/s1.png"), id: "72" },
                { type: "d", icon: require("../assets/d1.png"), id: "73" },
            ],
            activeIcons: [
                require("../assets/j.png"),
                require("../assets/g.png"),
                require("../assets/jb.png"),
                require("../assets/s.png"),
                require("../assets/d.png"),
            ],
            geometries: [
                // {
                //     id: "wxkq",
                //     category_id: "wxkq",
                //     styleId: "wxkq",
                //     position: new TMap.LatLng(32.058228, 118.791178),
                // },
            ],
            swiperOptions: {
                slidesPerView: 1,
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction",
                },
            },
            styles: {
                52: new TMap.MarkerStyle({
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
                71: new TMap.MarkerStyle({
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
                53: new TMap.MarkerStyle({
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
                72: new TMap.MarkerStyle({
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
                73: new TMap.MarkerStyle({
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
                wxkq: new TMap.MarkerStyle({
                    width: parseInt(297 / 4),
                    height: parseInt(267 / 4),
                    src: require("../assets/sjwxkt.png"),
                }),
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
        document.title = "文都坐标";
        that.initMap();

        window.handleHide = this.handleHide;
    },
    methods: {
        showvideoclick() {
            this.playerOptions["sources"][0]["src"] = this.shipin;
            this.showvideo = true;
        },
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
            let styles = { ...this.styles };
            let geometries = [...this.geometries];
            geometries.forEach((element, index) => {
                if (element.src) {
                    styles["i" + element.id] = new TMap.MarkerStyle({
                        width: parseInt(200 / 4),
                        height: parseInt(200 / 4),
                        color: "#317B73",
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                        src: element.src,
                    });
                    geometries[index].styleId = "i" + element.id;
                }
            });
            this.marker = new TMap.MultiMarker({
                map: this.map, // 显示Marker图层的底图
                styles: styles,
                enableCollision: false,
                geometries: geometries,
            });
            this.marker.on("click", this.markerClick);
        },
        handleHide() {
            this.infoWindow.close();
            this.showinfo = false;
            this.$refs.videoPlayer.player.pause();
        },
        markerClick(evt) {
            let that = this;
            this.$axios
                .get("app.ashx?action=Getjingdian&id=" + evt.geometry.id)
                .then(function (response) {
                    if (response.data.data) {
                        var item = response.data.data;
                        that.shipin = item.fields.shipin;
                        console.log(item);
                        that.banners = item.albums;
                        that.infotitle = item.title;
                        that.center = new TMap.LatLng(
                            item.fields.jingdu,
                            item.fields.weidu
                        );
                        that.map.setCenter(that.center);
                        that.infocontent = item.fields.jingdianjieshao;
                        var iC =
                            `
                            <div class="infowindow">
                                <div class="infoinner">
                                    <img src="` +
                            item.img_url +
                            `">
                                    <div class="infocontent">
                                        <div class="infotitle">` +
                            item.title +
                            `</div>
                                        <p>详细地址：` +
                            item.fields.xiangxidizhi +
                            `</p>
                                        <p>开放时间：` +
                            item.fields.kaifangshijian +
                            `</p>
                                        <p>参观费用：` +
                            item.fields.canguanfeiyong +
                            `</p>
                                    </div>
                                </div>
                                <a onclick="handleHide()" class="infoclose">
                                    <img src="/close.png" />
                                </a>
                            </div>
                        `;
                        that.infoWindow.setPosition(that.center);
                        that.infoWindow.setContent(iC);
                        that.infoWindow.open();
                        that.showinfo = true;

                        // response.data.data.forEach((element) => {
                        //     var geometrie = {
                        //         id: element.id,
                        //         styleId: element.category_id,
                        //         position: new TMap.LatLng(element.jingdu, element.weidu),
                        //         content: element.title,
                        //         src: element.jianzhutupian,
                        //     };
                        //     console.log(element.jianzhutupian);
                        //     that.geometries.push(geometrie);
                        //     geometrie = {};
                        // });
                        // sessionStorage.setItem(
                        //     "geometries",
                        //     JSON.stringify(that.geometries)
                        // );
                        // that.createMarker();
                    }
                })
                .catch(function (error) {
                    that.$message.error("网络错误！");
                });
        },
        showPos(type, v) {
            let that = this;
            var activeImg = [
                { type: "j", icon: require("../assets/j1.png"), id: "52" },
                { type: "g", icon: require("../assets/g1.png"), id: "71" },
                { type: "ju", icon: require("../assets/jb1.png"), id: "53" },
                { type: "s", icon: require("../assets/s1.png"), id: "72" },
                { type: "d", icon: require("../assets/d1.png"), id: "73" },
            ];
            this.icons = activeImg;
            this.icons[v].icon = this.activeIcons[v];
            var geometries = sessionStorage.getItem("geometries");
            geometries = JSON.parse(geometries);

            var fileterGeo = geometries.filter(
                (item) =>
                    item.category_id == that.icons[v].id || item.category_id == "wxkq"
            );
            this.marker.setMap(null);
            this.marker = null;
            this.geometries = fileterGeo;
            this.createMarker();
        },
        initMap() {
            let that = this;
            var map;
            this.map = map = new TMap.Map(document.getElementById("map"), {
                center: this.center,
                doubleClickZoom: false,
                mapStyleId: "style1",
                zoom: 15, // 设置地图缩放级别
                // pitch: 43.5, // 设置俯仰角
                // rotation: 45, // 设置地图旋转角度
                pitch: 0,
                viewMode: "2D",
                rotation: 0,
            });

            // map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
            map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE);
            map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);
            this.$axios
                .get("app.ashx?action=Getjingdianconcise")
                .then(function (response) {
                    if (response.data.data) {
                        response.data.data.forEach((element) => {
                            var geometrie = {
                                id: element.id,
                                styleId: element.category_id,
                                position: new TMap.LatLng(element.jingdu, element.weidu),
                                content: element.title,
                                category_id: element.category_id,
                                src: element.jianzhutupian,
                            };
                            that.geometries.push(geometrie);
                            geometrie = {};
                        });
                        sessionStorage.setItem(
                            "geometries",
                            JSON.stringify(that.geometries)
                        );
                        that.createMarker();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.$message.error("网络错误！");
                });

            if (this.$route.query.id) {
                this.markerClick({ geometry: { id: this.$route.query.id } });
            }

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
    overflow-y: scroll;
}
.infocontent {
    padding: calc(20px / 4);
    max-height: calc(1200px / 4);
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
    min-height: calc(600px / 4);
    max-height: 80%;
    background: url("~@/assets/infobg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: calc(40px / 4);
    box-shadow: 5px 5px 5px #c3c3c3;
    padding: calc(40px / 4);
    position: absolute;
    z-index: 99999;
    right: 10%;
    top: 10%;
}
.biginfoinner {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 5%;
    overflow-y: scroll;
}
.biginfoinner .infocontent {
    max-height: calc(800px / 4);
}
.biginfoinner img {
    width: 100%;
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
#map > div > div:last-child {
    display: none;
}
</style>
