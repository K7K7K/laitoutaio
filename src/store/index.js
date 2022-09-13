import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo } from "@/api/home";
import { getUploadToke, uploadQiniu } from "@/api/api";

Vue.use(Vuex);
const CHANGE = "change";
export default new Vuex.Store({
  //存放数据
  state: {
    a: 1,
    uid: "",
    token: "",
    userInfo: {},
    isLogin: false,
  },
  getters: {},
  //修改数据
  mutations: {
    changea(state, val) {
      state.a = val;
    },
    [CHANGE](state, { key, value }) {
      state[key] = value;
    },
    clear(state) {
      state.uid = "";
      state.token = "";
      state.userInfo = {};
      state.isLogin = false;
    },
  },
  actions: {
    //在这写异步
    async getUserInfo(json, token) {
      console.log(json);
      return getUserInfo({
        token,
      }).then((res) => {
        console.log(res);
        json.commit("change", { key: "userInfo", value: res.userInfo });
        json.commit("change", { key: "uid", value: res.uid });
        json.commit("change", { key: "token", value: res.token });
        json.commit("change", { key: "isLogin", value: true });
      });
    },
    //上传图片
    async upload(state, fileList) {
      console.log(fileList);
      let imageSrc = [];
      if (fileList.length == 0) {
        //没上传图片
        return imageSrc;
      }
      //需要循环
      //多个异步任务都要执行完成 返回他们完成后的结果
      let task = fileList.map((v) => {
        return new Promise(async (resolve, reject) => {
          let { file } = v;
          console.log(file);
          let { type } = file;
          //  拿到类型  比如jpg
          type = type.split("/")[1];
          // 重新命名
          let file_name = `${new Date().getTime()}_${Math.random().toString(36).slice(2)}.${type}`;
          //去服务器申请一个token
          let { token } = await getUpoadToke();
          console.log(token);

          // new一个form data   并且把文件 token  和文件的名字放进去  file token key是固定的 不能改
          const formdata = new FormData();
          formdata.append("file", file);
          formdata.append("token", token);
          formdata.append("key", file_name);
          uploadQiniu(formdata).then((res) => {
            console.log(res);
            resolve(`http://toutiao.longxiaokj.com/` + res.key);
          });
        });
      });
      imageSrc = await Promise.all(task);
      console.log(imageSrc);

      return imageSrc;
    },
  },
  modules: {},
});
