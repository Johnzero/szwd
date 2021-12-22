<template>
    <div>
        <div id="map"></div>
        <div v-drag v-show="showbiginfo" class="biginfo">
            <div class="biginfoinner">
                <div class="infocontent">
                    <div class="infotitle">
                        {{ gsDetail.title }}
                    </div>
                    <div v-html="gsDetail.content"></div>
                </div>
            </div>
            <a onclick="handleHide()" class="infoclose">
                <img src="@/assets/close.png" />
            </a>
        </div>
        <InfoWindow
            v-show="showInfoWindow"
            ref="infoWindow"
            :info-gss="infoGs"
            :info-detail="infoDetail"
        ></InfoWindow>
    </div>
</template>

<script>
import InfoWindow from "@/components/InfoWindow";
import $ from "jquery";

export default {
    name: "Wdzp",
    components: { InfoWindow },
    data() {
        return {
            marker: {},
            menus: [],
            showInfoWindow: false,
            infoWindow: {},
            infoDetail: {},
            infoGs: [],
            gsDetail: {},
            map: {},
            jds: [],
            center: new TMap.LatLng(32.058228, 118.791178),
            infotitle: "",
            infocontent: "",
            showbiginfo: false,
            banners: ["https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/em.jpg"],
            geometries: [
                {
                    id: "wxkq",
                    category_id: "wxkq",
                    styleId: "wxkq",
                    position: new TMap.LatLng(32.058228, 118.791178),
                },
            ],
            styles: {
                52: new TMap.MarkerStyle({
                    width: parseInt(100 / 1),
                    height: parseInt(100 / 1),
                    // anchor: { x: 80 / 1, y: 98 / 1 }, // 标注点图片的锚点位置
                    src: require("../assets/book.png"),
                    color: "#317B73",
                    size: 48 / 1,
                    direction: "bottom", // 标注点文本文字相对于标注点图片的方位
                    offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
                    strokeColor: "#fff", // 标注点文本描边颜色
                    strokeWidth: 2, // 标注点文本描边宽度
                }),
                wxkq: new TMap.MarkerStyle({
                    width: parseInt(297 / 1),
                    height: parseInt(267 / 1),
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
        that.initMap();
        window.handleHideinfo = this.handleHideinfo;
        window.handleHide = this.handleHide;
        window.showBigInfo = this.showBigInfo;
    },
    methods: {
        createMarker() {
            let that = this;
            let styles = { ...this.styles };
            let geometries = [...this.geometries];
            this.marker = new TMap.MultiMarker({
                map: this.map, // 显示Marker图层的底图
                styles: styles,
                enableCollision: false,
                geometries: geometries,
            });
            this.marker.on("click", this.markerClick);
        },
        showBigInfo(e) {
            let that = this;
            this.showbiginfo = true;
            if (e) {
                $(".gsul li").removeClass("actived");
                $(e).addClass("actived");
                this.$axios
                    .get("app.ashx?action=GetWenXueGuShiToId&id=" + $(e).data("id"))
                    .then(function (response) {
                        if (response.data.data) {
                            var item = response.data.data;
                            console.log(item);
                            if (item.length == 0) {
                                return;
                            }
                            that.gsDetail = item[0];
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        that.$message.error("网络错误！");
                    });
            } else {
                that.gsDetail.title = that.infoDetail.title;
                that.gsDetail.content = that.infoDetail.mingpianmingzuo;
            }
        },
        handleHideinfo() {
            console.log(1);
            this.infoWindow.close();
        },
        handleHide() {
            this.showbiginfo = false;
        },
        markerClick(evt) {
            let that = this;
            var jd = this.jds.filter((item) => item.id == evt.geometry.id);
            jd = jd[0];
            this.infoDetail = jd;
            that.infoGs = [];
            this.$axios
                .get(
                    "app.ashx?action=GetWenXueGuShi&pageSize=100&pageIndex=1&jdid=" +
                        evt.geometry.id
                )
                .then(function (response) {
                    if (response.data.data) {
                        var item = response.data.data;
                        // if (item.length == 0) {
                        //     return;
                        // }
                        that.infoGs = item;
                    }
                    setTimeout(() => {
                        that.infoWindow.setPosition(evt.geometry.position);
                        that.infoWindow.setContent(that.$refs.infoWindow.$el.innerHTML);
                        that.infoWindow.open();
                    }, 500);
                })
                .catch(function (error) {
                    console.log(error);
                    that.$message.error("网络错误！");
                });
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
            map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);

            this.$axios
                .get("app.ashx?action=Getjingdian&fenleiid=52")
                .then(function (response) {
                    if (response.data.data) {
                        that.jds = response.data.data;
                        response.data.data.forEach((element) => {
                            var geometrie = {
                                id: element.id,
                                styleId: element.category_id,
                                position: new TMap.LatLng(element.jingdu, element.weidu),
                                content: element.title,
                                category_id: element.category_id,
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
.biginfo {
    width: calc(960px / 1);
    min-height: calc(600px / 1);
    max-height: 80%;
    background: url("~@/assets/infobg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: calc(40px / 1);
    box-shadow: 5px 5px 5px #c3c3c3;
    padding: calc(40px / 1);
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
    max-height: calc(800px / 1);
}
.biginfoinner p {
    margin-bottom: 0;
}
.biginfoinner img {
    width: 100%;
}
.biginfocontent {
    padding: calc(20px / 1);
    overflow-y: scroll;
}
.biginfoinner .infocontent {
    padding: 5%;
}
.biginfoinner .infotitle {
    width: 100%;
    color: black;
    font-size: calc(32px / 1);
    display: block;
    margin-bottom: calc(20px / 1);
}
.infoclose img {
    width: 100%;
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
