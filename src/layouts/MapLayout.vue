<template>
    <div>
        <div class="menu">
            <a class="hide" @click="handleHide">
                <img src="~@/assets/hide.png" alt="" />
            </a>
            <ul class="menu_icon">
                <li v-for="(row, index) in icons" :key="index">
                    <a :href="row.route" v-if="index <= 4"><img :src="row.icon" /></a>
                    <a class="menuDisable" v-if="index > 4"><img :src="row.icon" /></a>
                </li>
            </ul>
        </div>
        <div class="submenu">
            <a class="show" @click="handleShow">
                <img src="~@/assets/show.png" alt="" />
            </a>
            <ul class="submenu_icon">
                <li v-for="(row, index) in subicons" :key="index">
                    <a :href="row.route" v-if="index <= 4"><img :src="row.icon" /></a>
                    <a v-if="index > 4"><img :src="row.icon" /></a>
                </li>
            </ul>
        </div>
        <a @click="ewm = true" class="tip">
            <img src="~@/assets/tip.gif" alt="" />
        </a>
        <div v-drag v-show="ewm" class="ermBlock">
            <img src="~@/assets/ewm.png" />
            <a @click="ewm = false" class="infoclose">
                <img src="/close.png" />
            </a>
        </div>
        <router-view />
    </div>
</template>

<script>
import $ from "jquery";
export default {
    name: "MapLayout",
    components: {},
    data() {
        return {
            ewm: false,
            isProPreviewSite: process.env.NODE_ENV !== "development",
            menus: [],
            active: sessionStorage.getItem("menuActive"),
            icons: [
                { route: "/", icon: require("../assets/home.png") },
                { route: "/wdzb", icon: require("../assets/wdzb_menu.png") },
                { route: "/wdlx", icon: require("../assets/wdlx_menu.png") },
                { route: "/wdrw", icon: require("../assets/wdrw_menu.png") },
                { route: "/wdzp", icon: require("../assets/wdzp_menu.png") },
                { route: "/wdtp", icon: require("../assets/wdtp_menu.png") },
                { route: "/wdtz", icon: require("../assets/wdtz_menu.png") },
            ],
            iconsActive: [
                { route: "/", icon: require("../assets/home.png") },
                { route: "/wdzb", icon: require("../assets/wdzb_menu1.png") },
                { route: "/wdlx", icon: require("../assets/wdlx_menu1.png") },
                { route: "/wdrw", icon: require("../assets/wdrw_menu1.png") },
                { route: "/wdzp", icon: require("../assets/wdzp_menu1.png") },
                { route: "/wdtp", icon: require("../assets/wdtp_menu.png") },
                { route: "/wdtz", icon: require("../assets/wdtz_menu.png") },
            ],
            subicons: [
                { route: "/", icon: require("../assets/home_submenu.png") },
                { route: "/wdzb", icon: require("../assets/wdzb_submenu.png") },
                { route: "/wdlx", icon: require("../assets/wdlx_submenu.png") },
                { route: "/wdrw", icon: require("../assets/wdrw_submenu.png") },
                { route: "/wdzp", icon: require("../assets/wdzp_submenu.png") },
                { route: "/wdtp", icon: require("../assets/wdtp_submenu.png") },
                { route: "/wdtz", icon: require("../assets/wdtz_submenu.png") },
            ],
            subiconsActive: [
                { route: "/", icon: require("../assets/home_submenu.png") },
                { route: "/wdzb", icon: require("../assets/wdzb_submenu1.png") },
                { route: "/wdlx", icon: require("../assets/wdlx_submenu1.png") },
                { route: "/wdrw", icon: require("../assets/wdrw_submenu1.png") },
                { route: "/wdzp", icon: require("../assets/wdzp_submenu1.png") },
                { route: "/wdtp", icon: require("../assets/wdtp_submenu.png") },
                { route: "/wdtz", icon: require("../assets/wdtz_submenu.png") },
            ],
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

        var icons = [...this.icons];
        this.icons.forEach(function (v, i) {
            if (v.route == that.$route.path) {
                that.icons[i].icon = that.iconsActive[i].icon;
            }
        });
        var subicons = [...this.subicons];
        this.subicons.forEach(function (v, i) {
            if (v.route == that.$route.path) {
                that.subicons[i].icon = that.subiconsActive[i].icon;
            }
        });
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
    z-index: 999999999;
}
.submenu {
    width: calc(120px / 4);
    height: calc(1260px / 4);
    background: url("~@/assets/submenu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 10%;
    z-index: 999999999;
    display: none;
}
.show {
    width: calc(120px / 4);
    height: calc(120px / 4);
    background: none;
    border: none;
    position: absolute;
    left: calc(120px / 2 / 4);
    top: calc(-120px / 2 / 4);
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
.menu_icon {
    width: calc(540px / 4);
    text-align: center;
    padding: 0;
    margin-left: 3%;
    margin-top: calc(120px / 4);
}
.menu_icon li {
    display: inline-block;
    list-style: none;
    width: calc(360px / 4);
    height: calc(100px / 4);
    margin-bottom: calc(60px / 4);
}
.menu_icon li img {
    width: 100%;
    height: 100%;
}

.submenu_icon {
    width: calc(120px / 4);
    text-align: center;
    padding: 0;
    margin-left: 3%;
    margin-top: calc(120px / 4);
}
.submenu_icon li {
    list-style: none;
    width: calc(115px / 4);
    height: calc(100px / 4);
    margin-bottom: calc(60px / 4);
}
.submenu_icon li img {
    width: 100%;
    height: 100%;
}
.tip {
    width: calc(600px / 4);
    height: calc(1000px / 4);
    position: absolute;
    right: 0;
    bottom: 20%;
    z-index: 9999;
}
.tip img {
    width: 100%;
    height: 100%;
}
.menuDisable {
    opacity: 0.5;
}
.ermBlock {
    z-index: 999999999;
    width: calc(960px / 4);
    height: calc(960px / 4);
    background: url("~@/assets/infobg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: calc(30px / 4);
    box-shadow: 5px 5px 5px #c3c3c3;
    padding: calc(40px / 4);
    position: absolute;
    z-index: 999999999;
    top: 30%;
    left: calc(100vh - 960px / 2 / 4);
}
.ermBlock img {
    width: 100%;
    height: 100%;
}
.infoclose {
    top: calc(-120px / 2 / 4);
    right: calc(-120px / 2 / 4);
    position: absolute;
    width: calc(120px / 4);
    height: calc(120px / 4);
}
</style>
