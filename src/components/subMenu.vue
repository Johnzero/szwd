<template>
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
            console.log(1);
            $(".menu").hide();
        },
    },
    mounted() {
        sessionStorage.setItem("menuActive", 1);
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
}
.menu {
    width: calc(540px / 4);
    height: calc(1260px / 4);
    background: url("~@/assets/menu.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
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
