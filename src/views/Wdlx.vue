<template>
    <div>
        <div id="map"></div>
        <ul class="buttons">
            <li v-for="(row, index) in icons" :key="index">
                <a @click="showPos(row.type, index)"><img :src="row.icon" /></a>
            </li>
        </ul>
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
            infoWindow: {},
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
        };
    },
    mounted() {
        let that = this;
        window.handleHide = this.handleHide;
        sessionStorage.setItem("geometries", JSON.stringify(this.geometries));
        this.initMap();
    },
    methods: {
        poly() {
            var dashPaths = [
                new TMap.LatLng(39.97912, 116.30563),
                new TMap.LatLng(39.97812, 116.33563),
                new TMap.LatLng(40.17812, 116.33563),
            ];

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
                    j: new TMap.MarkerStyle({
                        width: parseInt(80 / 4),
                        height: parseInt(98 / 4),
                        anchor: { x: 80 / 4 / 2, y: 98 / 4 / 2 }, // 标注点图片的锚点位置
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
                        anchor: { x: 80 / 4 / 2, y: 98 / 4 / 2 }, // 标注点图片的锚点位置
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
                        anchor: { x: 80 / 4 / 2, y: 98 / 4 / 2 }, // 标注点图片的锚点位置
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
                        anchor: { x: 80 / 4 / 2, y: 98 / 4 / 2 }, // 标注点图片的锚点位置
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
                        anchor: { x: 80 / 4 / 2, y: 98 / 4 / 2 }, // 标注点图片的锚点位置
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
            this.center = new TMap.LatLng(39.97912, 116.30563);
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

            this.infoWindow = new TMap.InfoWindow({
                map: this.map,
                position: this.center,
                enableCustom: true,
                content: "<div></div>",
            });
            this.infoWindow.close();
            this.poly();
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
.infoclose {
    top: calc(-120px / 2 / 4);
    right: calc(-120px / 2 / 4);
    position: absolute;
    width: calc(120px / 4);
    height: calc(120px / 4);
}
</style>
