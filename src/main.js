import Vue from "vue";
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/dist/antd.css';
import { Button, Row, Col,Icon,message } from "ant-design-vue";
import App from "./App";
// import './core/lazy_use';
import router from "./router";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

import axios from 'axios'

Vue.use(VideoPlayer)
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Icon.name, Icon);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://wxdt.vqune.com/tools/' 
Vue.prototype.$axios = axios
Vue.prototype.$message= message

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
