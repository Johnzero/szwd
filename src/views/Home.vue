<template>
    <a-row class="homeimg">
        <a-col :span="12">
            <a href="/wdzb"> <img src="~@/assets/wdzb.png" /> </a>
        </a-col>
        <a-col :span="12">
            <a-col :span="24"
                ><a href="/wdlx"> <img src="~@/assets/wdlx.png" /> </a
            ></a-col>
            <a-col :span="12"
                ><a href="/wdrw"> <img src="~@/assets/wdrw.png" /> </a
            ></a-col>
            <a-col :span="12"
                ><a href="/wdzp"> <img src="~@/assets/wdzp.png" /> </a
            ></a-col>
        </a-col>
    </a-row>
</template>
<script>
export default {
    name: "Home",
    components: {},
};
</script>
<style scoped>
.homeimg img {
    width: 100%;
    height: 100%;
}
</style>
