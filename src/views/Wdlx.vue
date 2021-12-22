<template>
    <div>
        <div id="map"></div>
        <ul v-show="!showlx" class="lxs">
            <li
                :class="'color' + lx.shuxing"
                @click="lxDetail(lx)"
                :key="lx.id"
                v-for="lx in lxs"
            >
                {{ lx.title }}
            </li>
        </ul>
        <div v-show="showlx" class="lx">
            <a class="lxmctitle">{{ lx.title }}</a>
            <p class="lxmctext">共{{ lxzb.length }}个景点 约4小时</p>
            <ul>
                <li @click="showPos(zb.id)" :key="zb.id" v-for="zb in lxzb">
                    {{ zb.title }}
                </li>
            </ul>
        </div>
        <div v-show="info" class="lxwindow">
            <img v-if="lx.xianluimg1" :src="lx.xianluimg1" />
            <img v-if="lx.xianluimg2" :src="lx.xianluimg2" />
            <img v-if="lx.xianluimg3" :src="lx.xianluimg3" />
            <img :key="img.id" v-for="img in lximgs" :src="img.img_url" />
        </div>
        <a v-show="info" @click="info = false" class="infoclose">
            <img src="/close.png" />
        </a>

        <a
            v-show="showlx"
            @click="
                showlx = false;
                info = false;
            "
            class="backbutton"
        >
            <img src="~@/assets/back.png" width="100%" />
        </a>
    </div>
</template>

<script>
export default {
    name: "Wdlx",
    components: {},
    data() {
        return {
            menus: [],
            marker: null,
            polylineLayer: null,
            map: {},
            info: false,
            infoWindow: {},
            showlx: false,
            lx: {},
            lxzb: [],
            lximgs: [],
            active: 0,
            center: new TMap.LatLng(32.058228, 118.791178),
            lxs: [],
            geometries: [],
        };
    },
    mounted() {
        let that = this;
        document.title = "文都路线";
        window.handleHide = this.handleHide;
        sessionStorage.setItem("geometries", JSON.stringify(this.geometries));
        this.initMap();
    },
    methods: {
        lxDetail(v) {
            let that = this;
            this.lx = v;
            console.log(v);
            this.showlx = true;
            this.info = true;
            this.$axios
                .get("app.ashx?action=Getxianlutoid&xlid=" + v.id)
                .then(function (response) {
                    if (response.data.data) {
                        that.lxzb = response.data.data;
                        that.createMarker();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.$message.error("网络错误！");
                });

            that.lximgs = [];
            this.$axios
                .get("app.ashx?action=GetXianLuJinDianImg&xlid=" + v.id)
                .then(function (response) {
                    if (response.data.data) {
                        that.lximgs = response.data.data;
                        console.log(that.lximgs);
                    }
                })
                .catch(function (error) {
                    that.$message.error("网络错误！");
                });
        },
        showPos(id) {
            console.log(id);
        },
        poly() {},
        markerClick() {},
        createMarker() {
            let that = this;
            let geometries = [];
            that.lxzb.forEach((element, index) => {
                var style = "lx";
                if (index == 0) {
                    style = "lx_start";
                }
                if (index == that.lxzb.length - 1) {
                    console.log(index);
                    style = "lx_end";
                }
                var geometrie = {
                    id: element.id,
                    styleId: style,
                    position: new TMap.LatLng(element.jingdu, element.weidu),
                    content: element.title,
                };
                geometries.push(geometrie);
                geometrie = {};
            });
            if (this.marker) {
                this.marker.setMap(null);
                this.marker = null;
            }

            this.marker = new TMap.MultiMarker({
                map: this.map,
                styles: {
                    lx_start: new TMap.MarkerStyle({
                        width: parseInt(85 / 4),
                        height: parseInt(146 / 4),
                        color: "#317B73",
                        src: require("../assets/lx_start.png"),
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                    lx: new TMap.MarkerStyle({
                        width: parseInt(85 / 4),
                        height: parseInt(146 / 4),
                        color: "#317B73",
                        src: require("../assets/lxico.png"),
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                    lx_end: new TMap.MarkerStyle({
                        width: parseInt(85 / 4),
                        height: parseInt(146 / 4),
                        color: "#317B73",
                        src: require("../assets/lx_end.png"),
                        size: 48 / 4,
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                },
                enableCollision: false,
                geometries: geometries,
            });

            var dashPaths = [];
            that.lxzb.forEach((element) => {
                dashPaths.push(new TMap.LatLng(element.jingdu, element.weidu));
            });
            that.map.setCenter(dashPaths[parseInt(dashPaths.length / 2)]);
            if (this.polylineLayer) {
                this.polylineLayer.setMap(null);
                this.polylineLayer = null;
            }
            this.polylineLayer = new TMap.MultiPolyline({
                id: "polyline-layer",
                map: this.map,
                styles: {
                    dash: new TMap.PolylineStyle({
                        color: "#317B73",
                        width: 3,
                        borderWidth: 0,
                        dashArray: [10, 5],
                        lineCap: "round",
                    }),
                },
                geometries: [
                    {
                        id: "pl_1",
                        styleId: "dash",
                        paths: dashPaths,
                    },
                ],
            });
            // this.marker.on("click", this.markerClick);
        },
        getLx() {
            let that = this;
            this.$axios
                .get(
                    "app.ashx?action=GetRecommendRoutes&shuxing=0&pagesize=20&pageindex=1"
                )
                .then(function (response) {
                    if (response.data.data) {
                        that.lxs = response.data.data;
                        console.log(that.lxs);
                    }
                })
                .catch(function (error) {
                    that.$message.error("网络错误！");
                });
        },
        handleHide() {
            this.info = false;
        },
        initMap() {
            var map;
            this.map = map = new TMap.Map(document.getElementById("map"), {
                center: this.center,
                doubleClickZoom: false,
                mapStyleId: "style1",
                zoom: 11, // 设置地图缩放级别
                // pitch: 43.5, // 设置俯仰角
                // rotation: 45, // 设置地图旋转角度
                pitch: 0,
                rotation: 0,
            });
            map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);
            // this.createMarker();
            this.getLx();
            // this.poly();
        },
    },
};
</script>
<style scoped>
.lxwindow {
    width: calc(880px / 4);
    max-height: 80%;
    background: #68cead;
    border-radius: calc(30px / 4);
    box-shadow: 20px 20px 25px rgb(38 22 22 / 25%);
    padding: calc(20px / 4);
    z-index: 99999;
    overflow-x: none;
    overflow-y: scroll;
    position: absolute;
    right: 10%;
    top: 10%;
}
.lxwindow > img {
    width: 100%;
    /* height: 100%; */
}
.infoclose {
    top: calc(10% - 120px / 2 / 4);
    right: calc(10% - 120px / 2 / 4);
    position: absolute;
    width: calc(120px / 4);
    height: calc(120px / 4);
    z-index: 999999;
}
.infoclose img {
    width: 100%;
    height: 100%;
}
.lxs {
    width: calc(1900px / 4);
    position: absolute;
    z-index: 9999;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 10%;
    list-style: none;
}
.lxs li:before {
    width: calc(25px / 4);
    height: calc(85px / 4);
    border-radius: 20%;
    background: #ffcb29;
    display: inline-block;
    content: "";
    top: calc(50% - 85px / 2 / 4);
    position: absolute;
    left: 0;
}
.lxs li {
    position: relative;
    width: calc(800px / 4);
    display: inline-block;
    height: calc(150px / 4);
    background: #fdf3bf;
    border-radius: calc(50px / 4);
    box-shadow: 0px 20px 20px rgb(38 22 22 / 25%);
    text-align: center;
    line-height: calc(150px / 4);
    margin-bottom: calc(80px / 4);
    overflow: hidden;
    color: #317b73;
    font-size: calc(46px / 4);
}
.lxs li:hover {
    background: #f8cb28;
    color: white;
}
.lxs li:nth-child(odd) {
    float: left;
}
.lxs li:nth-child(even) {
    float: right;
}
.lxs li:nth-child(even):before {
    background: #47c6c1;
}
.color1:before {
}

.color2:before {
    background: #49c6c1 !important;
}
.color2:hover {
    background: #49c6c1 !important;
    color: white !important;
}
.color3:before {
    background: #e63838 !important;
}
.color3:hover {
    background: #e63838 !important;
    color: white !important;
}

.lx {
    width: calc(450px / 4);
    position: absolute;
    left: 5%;
    top: 10%;
    z-index: 9999;
}
.lxmctitle {
    width: calc(450px / 4);
    height: calc(120px / 4);
    text-align: center;
    line-height: calc(120px / 4);
    display: block;
    color: white;
    font-size: calc(48px / 4);
    background: url("~@/assets/lxt.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: calc(20px / 4);
}
.lxmctext {
    width: calc(450px / 4);
    height: calc(120px / 4);
    text-align: center;
    line-height: calc(120px / 4);
    display: block;
    color: #317b73;
    font-size: calc(42px / 4);
    text-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: calc(20px / 4);
}
.lx ul {
    padding: 0;
    list-style-position: inside;
    text-align: center;
}
.lx ul li {
    line-height: calc(120px / 4);
    display: block;
    text-align: left;
    color: #317b73;
    font-size: calc(48px / 4);
    background: white;
    padding: 0 20%;
    border-radius: calc(120px / 4);
    margin-bottom: calc(20px / 4);
    box-shadow: 5px 5px 5px rgb(38 22 22 / 25%);
}

.lx ul li:before {
    width: calc(36px / 4);
    height: calc(36px / 4);
    margin-right: calc(20px / 4);
    border-radius: 50%;
    background: #96deda;
    display: inline-block;
    content: "";
}
.lx ul li:first-child:before {
    background: #68bcb3;
}
.lx ul li:last-child:before {
    background: #ed9898;
}
.backbutton {
    width: calc(300px / 4);
    height: calc(100px / 4);
    margin: 0 auto;
    position: absolute;
    z-index: 999999;
    bottom: 10%;
    left: 0;
    right: 0;
}
</style>
<style>
.menu {
    display: none;
}
.submenu {
    display: block;
}
</style>
