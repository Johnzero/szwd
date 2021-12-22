<template>
    <div>
        <div class="rw-block">
            <ul class="rws">
                <li>选择时期</li>
                <li
                    :class="{ actived: index == current }"
                    @click="lxDetail(lx, index)"
                    :key="lx.id"
                    v-for="(lx, index) in cats"
                >
                    {{ lx.title }}
                </li>
            </ul>
            <div class="pypx">拼音排序 <a-icon type="down" /></div>
            <swiper
                :auto-update="true"
                :auto-destroy="true"
                :key="swiperKey"
                v-show="rws"
                class="rwswg"
                ref="mySwiper"
                :options="swiperOptions"
            >
                <div
                    class="swiper-slide"
                    @click="rwDetail(rw, index, $event)"
                    :key="rw.id"
                    v-for="(rw, index) in rwsj"
                >
                    <img :src="rw.touxiang" />
                    <div class="verthelp"></div>
                    <a class="rwimg">
                        {{ rw.xingming }}
                    </a>
                </div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div ref="biginfo" v-drag v-show="showbiginfo" class="biginfo">
                <div class="biginfoinner">
                    <div class="infocontent">
                        <div v-html="dqrw.content"></div>
                    </div>
                </div>
                <div class="glzb">
                    <div class="zbtitle">关联坐标</div>
                    <ul class="zbs">
                        <li
                            @click="jumpTo(row.id)"
                            v-for="(row, index) in zbs"
                            :key="index"
                        >
                            {{ row.title }}
                        </li>
                    </ul>
                </div>
                <a @click="handleHide" class="infoclose">
                    <img src="/close.png" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Wdrw",
    components: {},
    data() {
        return {
            menus: [],
            rws: true,
            cats: [],
            rwsj: [],
            map: {},
            current: 9,
            lx: {},
            swiperKey: Math.random().toString(36).substr(2) /*随机的key*/,
            center: new TMap.LatLng(32.058228, 118.791178),
            geometries: [],
            swiperOptions: {
                slidesPerView: 6,
                slidesPerColumn: 2,

                autoplay: true,
                spaceBetween: 20,
                adaInterval: {},
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            },
            zbs: [],
            xos: 0,
            yos: 0,
            showbiginfo: false,
            dqrw: {},
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
    // computed: {
    //     swiper() {
    //         return this.$refs.mySwiper.$swiper;
    //     },
    // },
    mounted() {
        let that = this;
        document.title = "文都人物";
        this.adInterval = setInterval(() => {
            this.$refs.mySwiper.swiper.autoplay.start();
        }, 5000);
        this.$axios
            .get("app.ashx?action=Getniandai")
            .then(function (response) {
                if (response.data.data) {
                    // console.log(response.data.data);
                    that.cats = response.data.data;
                }
            })
            .catch(function (error) {
                console.log(error);
                that.$message.error("网络错误！");
            });

        this.$axios
            .get("app.ashx?action=Getrenwu&fenleiid=99&pageSize=1000&pageIndex=1")
            .then(function (response) {
                if (response.data.data) {
                    that.rwsj = response.data.data;
                }
            })
            .catch(function (error) {
                console.log(error);
                that.$message.error("网络错误！");
            });
    },
    methods: {
        jumpTo(id) {
            this.$router.push({ path: "/wdzb?id=" + id });
            console.log(id);
        },
        handleHide() {
            this.showbiginfo = false;
        },
        lxDetail(e, i) {
            let that = this;
            this.$axios
                .get(
                    "app.ashx?action=Getrenwu&fenleiid=" +
                        e.id +
                        "&pageSize=1000&pageIndex=1"
                )
                .then(function (response) {
                    if (response.data.data) {
                        that.rwsj = response.data.data;
                        console.log(that.rwsj.length);
                        if (that.rwsj.length < 7) {
                            that.swiperOptions.slidesPerColumn = 1;
                        } else {
                            that.swiperOptions.slidesPerColumn = 2;
                        }
                        that.swiperKey = Math.random().toString(36).substr(2);

                        // console.log(that.$refs.mySwiper.$swiper);
                        // console.log(that.swiperOptions);
                        // that.$refs.mySwiper.swiper.init();
                        // that.$refs.mySwiper.swiper.update();
                        // that.$refs.mySwiper.swiper.update();
                        // console.log(that.$refs.mySwiper.swiper);
                        // that.swiper.initSwiper();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.$message.error("网络错误！");
                });
            this.current = i;
        },
        rwDetail(e, i, event) {
            console.log(event.clientY);

            // this.$refs.biginfo.style.top = event.pageX + "px";
            // this.$refs.biginfo.style.left = event.pageY + "px";

            let that = this;
            this.dqrw = e;
            this.adInterval && clearInterval(this.adInterval);
            this.$refs.mySwiper.swiper.autoplay.stop();
            this.$axios
                .get(
                    "app.ashx?action=Getjingdiantouid&rwid=" +
                        e.id +
                        "&pageSize=100&pageIndex=1"
                )
                .then(function (response) {
                    if (response.data.data) {
                        that.zbs = response.data.data;
                    }
                    that.showbiginfo = true;
                })
                .catch(function (error) {
                    console.log(error);
                    that.$message.error("网络错误！");
                });
        },
    },
};
</script>
<style scoped>
.zbtitle {
    font-size: calc(32px / 2);
    padding: 1% 5%;
    height: calc(45px / 2);
    line-height: calc(45px / 2);
}
.zbtitle:before {
    width: calc(9px / 2);
    height: calc(24px / 2);
    border-radius: 20%;
    background: #ff8989;
    display: inline-block;
    content: "";
    margin-top: calc(10px / 2);
    margin-right: calc(10px / 2);
}
.zbs {
    width: 100%;
    padding: 0;
    margin-left: 0;
    margin: 0 auto;
    margin-top: calc(20px / 4);
    text-align: left;
    padding: 0 calc(30px / 4);
}
.zbs li {
    display: inline-block;
    list-style: none;
    padding: calc(10px / 4) calc(20px / 4);
    border-radius: calc(55px / 2 / 4);
    margin: calc(20px / 4);
    background: #f5acac;
    color: white;
    font-size: calc(28px / 4);
}
.rw-block {
    width: calc(3135px / 4);
    position: absolute;
    z-index: 999999;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
}
.pypx {
    width: calc(376px / 4);
    height: calc(104px / 4);
    font-size: calc(42px / 4);
    display: block;
    color: white;
    text-align: center;
    line-height: calc(104px / 4);
    background: url("~@/assets/pypx.png") no-repeat;
    background-size: 100% 100%;
}
.rws {
    width: 100%;
    height: calc(180px / 4);
    background: url("~@/assets/rws.png") no-repeat;
    background-size: 100% 100%;
}
.rws li {
    list-style: none;
    height: calc(120px / 4);
    display: inline-block;
    line-height: calc(120px / 4);
    background: none;
    border-radius: calc(60px / 4);
    padding: 0 calc(40px / 4);
    margin-top: calc(30px / 4);
    font-size: calc(45px / 4);
    margin-right: calc(45px / 4);
    color: white;
}
.rws li:first-child {
    color: #fce9b7;
}
.actived {
    color: #317b73 !important;
    background: white !important;
}
.rwswg {
    width: 100%;
    padding: calc(40px / 4);
    margin-top: calc(40px / 4);
}
.swiper-slide {
    width: calc(440px / 4);
    height: calc(440px / 4);
    position: relative;
    list-style: none;
    text-align: center;
    background: url("~@/assets/rwli.png") no-repeat;
    background-size: 100% 100%;
    border-radius: calc(40px / 4);
}
.swiper-slide > img {
    width: calc(258px / 4);
    height: calc(258px / 4);
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
}
.verthelp {
    width: 0;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}
.rwimg {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 2%;
    display: block;
    color: white !important;
    text-align: center;
    background: url("~@/assets/name.png") no-repeat;
    background-size: 100% 100%;
    width: calc(190px / 4);
    height: calc(54px / 4);
    line-height: calc(54px / 4);
    font-size: calc(46px / 4);
    overflow: hidden;
}
.swiper-button-prev:after {
    content: "";
}
.swiper-button-prev {
    background: url("~@/assets/moreL.png") no-repeat;
    background-size: 100% 100%;
    width: calc(100px / 4);
    height: calc(100px / 4);
}
.swiper-button-next:after {
    content: "";
}
.swiper-button-next {
    background: url("~@/assets/moreR.png") no-repeat;
    background-size: 100% 100%;
    width: calc(100px / 4);
    height: calc(100px / 4);
}

.biginfo {
    width: calc(980px / 4);
    background: url("~@/assets/rwbg.png") no-repeat;
    background-size: 100% 100%;
    border-radius: calc(40px / 4);
    box-shadow: 5px 5px 5px #c3c3c3;
    padding: calc(40px / 4);
    position: absolute;
    z-index: 9999999;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 12%;
}
.glzb {
    width: 100%;
    background: white;
    margin-top: calc(45px / 4);
    border-radius: calc(20px / 4);
}
.biginfoinner {
    width: 100%;
    height: calc(620px / 4);
    background: white;
    border-radius: 5%;
    overflow-y: scroll;
}
.biginfoinner .infocontent {
    height: calc(620px / 4);
}
.biginfoinner p {
    margin-bottom: 0;
}
.biginfoinner img {
    width: 100%;
}
.biginfocontent {
    padding: calc(20px / 4);
    overflow-y: scroll;
}
.biginfoinner .infocontent {
    padding: 5%;
}
.biginfoinner .infotitle {
    width: 100%;
    color: black;
    font-size: calc(32px / 4);
    display: block;
    margin-bottom: calc(20px / 4);
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
