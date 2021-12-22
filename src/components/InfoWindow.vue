<template>
    <div>
        <div class="infowindows">
            <div class="infoinners">
                <div class="info_name">{{ infoDetail.title }}</div>
                <div class="info_ul" onclick="showBigInfo(0)">文学作品</div>
                <div class="info_ul info_gs">关联故事</div>
                <ul class="gsul">
                    <li
                        :key="gs.id"
                        :class="{ active: index == isActive }"
                        v-for="(gs, index) in infoGss"
                        :data-id="gs.id"
                        :data-index="index"
                        onclick="showBigInfo(this)"
                    >
                        <a>{{ gs.title }}</a>
                    </li>
                </ul>
            </div>
            <a onclick="handleHideinfo()" class="infoclose">
                <img src="@/assets/close_red.png" />
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        infoGss: {
            type: Array,
            default: () => [],
        },
        infoDetail: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isActive: -1,
        };
    },
    mounted() {
        let that = this;
    },
    methods: {
        // handleHide() {
        //     console.log(111);
        // },
        edit() {
            // this.$parent.handleHide();
            console.log("编辑按钮测试");
        },
        del() {
            console.log("删除按钮测试");
        },
    },
};
</script>

<style lang="less" scoped>
.infowindows {
    width: calc(530px / 2);
    border-radius: calc(30px / 2);
    background: url("~@/assets/book_bg.png") no-repeat;
    background-size: 100% 100%;
    box-shadow: calc(20px / 2) calc(20px / 2) calc(25px / 2) rgb(0 0 0 / 23%);
    padding: calc(20px / 2);
}
.infoinners {
    width: 100%;
    height: 100%;
    background: none;
    border-radius: 5%;
}
.info_name {
    text-align: center;
    width: calc(490px / 2);
    height: calc(96px / 2);
    border-radius: calc(16px / 2);
    background: white;
    margin-bottom: 2%;
    font-size: calc(36px / 2);
    overflow: hidden;
    line-height: calc(96px / 2);
    font-weight: bold;
    color: black;
    padding: 0 calc(40px / 2);
}
.info_ul:before {
    width: calc(9px / 2);
    height: calc(24px / 2);
    border-radius: 20%;
    background: #c388ff;
    display: inline-block;
    content: "";
    margin-right: calc(20px / 2);
}
.info_ul:after {
    width: calc(48px / 2);
    height: calc(48px / 2);
    background: url("~@/assets/right.png") no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    content: "";
    float: right;
    margin-top: calc(24px / 2);
}
.info_ul {
    position: relative;
    width: calc(490px / 2);
    height: calc(96px / 2);
    display: inline-block;
    background: white;
    border-radius: calc(16px / 2);
    text-align: left;
    line-height: calc(96px / 2);
    margin-bottom: 2%;
    color: black;
    font-size: calc(32px / 2);
    font-weight: bold;
    padding: 0 calc(40px / 2);
}
.info_gs {
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
    margin-bottom: 0;
}
.info_gs:after {
    background: none;
}
.gsul {
    width: 100%;
    background: white;
    padding: calc(16px / 2) 0;
    border-bottom-left-radius: calc(16px / 2);
    border-bottom-right-radius: calc(16px / 2);
    margin-bottom: 0;
}
.gsul li {
    display: inline-block;
    list-style: none;
    width: 100%;
    height: calc(80px / 2);
    margin: 0;
    padding: 0 calc(40px / 2);
    font-size: calc(28px / 2);
    overflow: hidden;
}
.gsul .actived,
.gsul .actived a {
    background: #c388ff;
    color: white !important;
}
.gsul .actived:after {
    background: url("~@/assets/right_w.png") no-repeat;
    width: calc(48px / 2);
    height: calc(48px / 2);
    background-size: 100% 100%;
    display: inline-block;
    content: "";
    float: right;
}

.gsul li a {
    display: inline-block;
    width: 80%;
    height: 100%;
    line-height: calc(80px / 2);
    overflow: hidden;
    color: black;
}
.gsul li:after {
    width: calc(48px / 2);
    height: calc(48px / 2);
    background: url("~@/assets/right.png") no-repeat;
    background-size: 100% 100%;
    display: inline-block;
    content: "";
    float: right;
    margin-top: calc(80px / 2 / 2 - 48px / 2 / 2);
}

.infotitles {
    font-size: calc(32px / 2);
    font-weight: bold;
    padding-bottom: calc(10px / 2);
    margin-bottom: calc(10px / 2);
    border-bottom: 1px solid #dedede;
}

.infowindows img {
    width: 100%;
    border-top-left-radius: 5%;
    border-top-right-radius: 5%;
}
</style>
