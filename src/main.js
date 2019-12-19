import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./stores";
import api from "./controller";
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(api);
Vue.use(Element);
// Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app");
