<template>
    <div>
        <div class="menu">
            <a-button class="hide" @click="handleHide">
                <img src="~@/assets/hide.png" alt="" />
            </a-button>
            <ul>
                <li>
                    <a href="">首页</a>
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
    width: calc(540px / 4);
    height: calc(1260px / 4);
    background: url("~@/assets/menu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 5%;
}
.submenu {
    width: calc(120px / 4);
    height: calc(1260px / 4);
    background: url("~@/assets/submenu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
}
.hide {
    width: calc(120px / 4);
    height: calc(120px / 4);
    background: none;
    border: none;
    position: absolute;
    right: 10%;
    top: -3%;
}
.hide img {
    width: calc(120px / 4);
    height: calc(120px / 4);
}
</style>
