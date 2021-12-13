<template>
    <div>
        <div id="map"></div>
        <div class="lx">
            <a class="lxmctitle">李白追月路线</a>
            <p class="lxmctext">共7个景点 约4小时</p>
            <ul>
                <li @click="showPos(2)">新亭公园</li>
                <li>新亭公园</li>
                <li>新亭公园</li>
                <li>新亭公园</li>
                <li>新亭公园</li>
                <li>新亭公园</li>
                <li>新亭公园</li>
                <li>新亭公园</li>
            </ul>
        </div>
        <div v-show="info" class="lxwindow">
            <img src="~@/assets/lbzy.png" />
        </div>
        <a v-show="info" @click="info = false" class="infoclose">
            <img src="/close.png" />
        </a>

        <a click="" class="backbutton">
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
            marker: {},
            menus: [],
            map: {},
            center: {},
            info: true,
            infoWindow: {},
            active: 0,
            geometries: [
                {
                    id: 1,
                    styleId: "lx_start",
                    position: new TMap.LatLng(39.97912, 116.30563),
                    content: "白家大院",
                },
                {
                    id: 2,
                    styleId: "lx",
                    position: new TMap.LatLng(39.97812, 116.35563),
                    content: "白家大院2",
                },
                {
                    id: 3,
                    styleId: "lx_end",
                    position: new TMap.LatLng(39.97812, 116.40563),
                    content: "白家大院2",
                },
            ],
        };
    },
    mounted() {
        let that = this;
        window.handleHide = this.handleHide;
        sessionStorage.setItem("geometries", JSON.stringify(this.geometries));
        this.initMap();
    },
    methods: {
        showPos(id) {
            console.log(id);
        },
        poly() {
            var dashPaths = [];
            this.geometries.forEach((ele) => {
                dashPaths.push(ele.position);
            });

            var polylineLayer = new TMap.MultiPolyline({
                id: "polyline-layer", //图层唯一标识
                map: this.map, //绘制到目标地图
                //折线样式定义
                styles: {
                    dash: new TMap.PolylineStyle({
                        color: "#317B73", //线填充色
                        width: 3, //折线宽度
                        borderWidth: 0, //边线宽度
                        dashArray: [10, 5],
                        lineCap: "round", //线端头方式
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
        },
        createMarker() {
            let that = this;
            this.marker = new TMap.MultiMarker({
                map: this.map, // 显示Marker图层的底图
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
                geometries: that.geometries,
            });
            // this.marker.on("click", this.markerClick);
        },
        handleHide() {
            this.info = false;
        },
        initMap() {
            this.center = new TMap.LatLng(39.97912, 116.30563);
            var map;
            this.map = map = new TMap.Map(document.getElementById("map"), {
                center: this.center,
                doubleClickZoom: false,
                mapStyleId: "style1",
                zoom: 13, // 设置地图缩放级别
                // pitch: 43.5, // 设置俯仰角
                // rotation: 45, // 设置地图旋转角度
                pitch: 0,
                rotation: 0,
            });

            this.createMarker();

            this.poly();
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
    color: #317b73;
    font-size: calc(48px / 4);
    background: white;
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
