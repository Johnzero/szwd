<template>
    <div>
        <div class="menu">
            <a-button class="hide" @click="handleHide">
                <img src="~@/assets/hide.png" alt="" />
            </a-button>
            <ul>
                <li v-for="(row, index) in icons" :key="index">
                    <a :href="{{row.route}}"><img :src="{{row.icon}}" /></a>
                </li>
            </ul>
        </div>
        <div class="submenu">
            <!-- <a-button class="hide" @click="handleHide">
                <img src="~@/assets/hide.png" alt="" />
            </a-button> -->
        </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "Menu",
    props: {},
    data() {
        return {
            isProPreviewSite: process.env.NODE_ENV !== "development",
            menus: [],
            icons: [
                { route: "/", icon: "~@/assets/home.png" },
                { route: "/wdzb", icon: "~@/assets/wdzb_menu.png" },
                { route: "/wdlx", icon: "~@/assets/wdlx_menu.png" }
                { route: "/wdrw", icon: "~@/assets/wdrw_menu.png" }
                { route: "/wdzp", icon: "~@/assets/wdzp_menu.png" }
                { route: "/wdtp", icon: "~@/assets/wdtp_menu.png" }
                { route: "/wdtz", icon: "~@/assets/wdtz_menu.png" }
            ],
            iconsActive: [
                { route: "/", icon: "~@/assets/home.png" },
                { route: "/wdzb", icon: "~@/assets/wdzb_menu1.png" },
                { route: "/wdlx", icon: "~@/assets/wdlx_menu1.png" }
                { route: "/wdrw", icon: "~@/assets/wdrw_menu1.png" }
                { route: "/wdzp", icon: "~@/assets/wdzp_menu1.png" }
                { route: "/wdtp", icon: "~@/assets/wdtp_menu.png" }
                { route: "/wdtz", icon: "~@/assets/wdtz_menu.png" }
            ],
            active: sessionStorage.getItem("menuActive"),
        };
    },
    methods: {
        handleHide() {
            // $(".menu").hide();
            $(".menu").slideToggle(1000, function () {
                $(".submenu").animate({}, 500, function () {
                    $(".submenu").css({ left: "0px", width: "250px", height: "auto" });
                });
            });
            sessionStorage.setItem("menu", 1);
        },
    },
    mounted() {
        // sessionStorage.setItem("menu", 0);
        // sessionStorage.setItem("menuActive", 1);
    },
};
</script>
<style scoped>
.menu {
    width: calc(540px / 1);
    height: calc(1260px / 1);
    background: url("~@/assets/menu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 5%;
}
.submenu {
    width: calc(120px / 1);
    height: calc(1260px / 1);
    background: url("~@/assets/submenu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
}
.hide {
    width: calc(120px / 1);
    height: calc(120px / 1);
    background: none;
    border: none;
    position: absolute;
    right: 10%;
    top: -3%;
}
.hide img {
    width: calc(120px / 1);
    height: calc(120px / 1);
}
</style>
