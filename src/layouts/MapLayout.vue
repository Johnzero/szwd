<template>
    <div>
        <div class="menu">
            <a class="hide" @click="handleHide">
                <img src="~@/assets/hide.png" alt="" />
            </a>
            <ul>
                <li>
                    <a href="">首页</a>
                </li>
            </ul>
        </div>
        <div class="submenu">
            <a class="show" @click="handleShow">
                <img src="~@/assets/show.png" alt="" />
            </a>
        </div>
        <router-view />
        <div id="map"></div>
    </div>
</template>

<script>
// import Menu from "@/components/Menu";
import $ from "jquery";
export default {
    name: "MapLayout",
    components: {},
    data() {
        return {
            isProPreviewSite: process.env.NODE_ENV !== "development",
            menus: [],
            active: sessionStorage.getItem("menuActive"),
        };
    },
    mounted() {
        this.initMap();
    },
    methods: {
        handleShow() {
            $(".submenu").slideToggle(500, function () {
                $(".menu").show();
            });
        },
        handleHide() {
            $(".menu").slideToggle(500, function () {
                $(".submenu").show();
            });
            // sessionStorage.setItem("menu", 1);
        },
        initMap() {
            var center = new TMap.LatLng(39.97912, 116.30563);
            var map;
            map = new TMap.Map(document.getElementById("map"), {
                center: center,
                mapStyleId: "style1",
                zoom: 17.2, // 设置地图缩放级别
                pitch: 43.5, // 设置俯仰角
                rotation: 45, // 设置地图旋转角度
            });

            var infoWindow = new TMap.InfoWindow({
                map: map,
                position: center,
                content:
                    "<div><img src='https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/em.jpg'><p>Hello World!</p></div>",
            });

            var marker = new TMap.MultiMarker({
                map: map, // 显示Marker图层的底图
                styles: {
                    small: new TMap.MarkerStyle({
                        // 点标注的相关样式
                        width: 34, // 宽度
                        height: 46, // 高度
                        anchor: { x: 17, y: 23 }, // 标注点图片的锚点位置
                        src:
                            "https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/small.png", // 标注点图片url或base64地址
                        color: "#333", // 标注点文本颜色
                        size: 16, // 标注点文本文字大小
                        direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                        offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                        strokeColor: "#fff", // 标注点文本描边颜色
                        strokeWidth: 2, // 标注点文本描边宽度
                    }),
                },
                enableCollision: false,
                geometries: [
                    {
                        id: 1,
                        styleId: "small",
                        position: new TMap.LatLng(39.97912, 116.30563),
                        content: "白家大院",
                    },
                    {
                        id: 2,
                        styleId: "small",
                        position: new TMap.LatLng(39.97812, 116.30563),
                        content: "白家大院2",
                    },
                ],
            });

            marker.on("click", function (evt) {
                console.log(evt.geometry.id);
                console.log(evt.geometry.position.toString());
            });

            var dashPaths = [
                new TMap.LatLng(39.97912, 116.30563),
                new TMap.LatLng(39.97812, 116.30563),
            ];
            var polylineLayer = new TMap.MultiPolyline({
                map,
                styles: {
                    style_dash: new TMap.PolylineStyle({
                        color: "#224BCF", // 线填充色
                        width: 2, // 折线宽度
                        lineCap: "round", // 线端头方式
                        dashArray: [10, 10], // 虚线展示方式
                    }),
                },
                geometries: [
                    {
                        styleId: "style_dash",
                        paths: dashPaths,
                    },
                ],
            });
            // console.log(map);
            // console.log(window);
        },
    },
};
</script>
<style lang="less">
@import "./BasicLayout.less";
.menuTop {
    width: calc(540px / 4);
    height: calc(1260px / 4);
    position: absolute;
    z-index: 9999999;
    top: 10%;
}
.menu {
    width: calc(615px / 4);
    height: calc(1334px / 4);
    background: url("~@/assets/menu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 5%;
    top: 10%;
    z-index: 99999;
}
.submenu {
    width: calc(120px / 4);
    height: calc(1260px / 4);
    background: url("~@/assets/submenu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 10%;
    z-index: 99999;
    display: none;
}
.show {
    width: calc(120px / 4);
    height: calc(120px / 4);
    background: none;
    border: none;
    position: absolute;
    left: calc(120px / 8);
    top: -3%;
}
.show:hover,
.show:active,
.show:focus {
    background: none;
    border: none;
}
.show img {
    width: calc(120px / 4);
    height: calc(120px / 4);
}
.hide {
    width: calc(120px / 4);
    height: calc(120px / 4);
    background: none;
    border: none;
    position: absolute;
    right: 3%;
    top: -3%;
}
.hide:hover,
.hide:active,
.hide:focus {
    background: none;
    border: none;
}
.hide img {
    width: calc(120px / 4);
    height: calc(120px / 4);
}
.logo-text {
    display: none;
}
</style>
