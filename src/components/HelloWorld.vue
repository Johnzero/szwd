<template>
  <div>
    <el-card class="box-card" style="padding: 0 80 30 80;width: 400px;border-radius: 10px;">
      <div id="del-div">
        <el-link type="primary" icon="el-icon-close" @click="close()"></el-link>
      </div>
      <div style="text-align: center;">
        <el-button type="primary">主要按钮</el-button>
      </div>
  </div>
</template>
<script>
export default {
    props: {
        infoWindow: {
            type: Object,
            default: () => {}
        },
    },
    methods: {
    // 关闭
        close() {
            // 高德地图信息窗关闭的api
            this.infoWindow.close()
        },
        edit() {
            console.log('编辑按钮测试')
        },
        del() {
            console.log('删除按钮测试')
        }
    }
}
</script>
 
<style lang="css" scoped>
#del-div {
  position: absolute;
  right: 20;
  top: 20;
  transform: scale(1.2);
}
</style>