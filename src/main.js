import Vue from "vue";
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/dist/antd.css';
import { Button, Row, Col } from "ant-design-vue";
import App from "./App";
// import './core/lazy_use';
import router from "./router";

Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
