import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
Vue.config.productionTip = false;

import Vuex from "vuex";

Vue.use(Vuex);

import { Lazyload } from "vant";

Vue.use(Lazyload);

Axios.defaults.baseURL = "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http";
Vue.prototype.$http = Axios;
// axios 拦截请求
Axios.interceptors.request.use((config) => {
  return config;
}),
  (err) => {
    return Promise.reject(err);
  };
Axios.interceptors.response.use((config) => {
  return config.data;
}),
  (err) => {
    return Promise.reject(err);
  };

//混入
Vue.mixin({
  data() {
    return {};
  },
});

let token = localStorage.getItem("token");
if (!token) {
  //第一没登录
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
} else {
  store.dispatch("getUserInfo", token).then((res) => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  });
}

// export default Axios;
