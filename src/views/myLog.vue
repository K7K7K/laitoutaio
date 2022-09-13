<template>
  <div class="mylog">
    <div class="misc">
      <van-nav-bar title="登录" class="bar" left-text="" left-arrow></van-nav-bar>
    </div>
    <van-form @submit="onSubmit" class="myLlis">
      <van-field v-model="username" type="tel" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />

      <div class="log" @click="getlog">
        <span>确定</span>
      </div>
      <router-link to="/reg" tag="span" class="goreg">还没账号，去注册</router-link>
      <router-link class="forget" to="/forget" tag="div">忘记密码</router-link>
    </van-form>
    <!-- {{ $store.state.a }} -->
    <!-- <button @click="$store.commit('changea', 2)">改</button> -->
  </div>
</template>

<script>
import { Field, NavBar, Button, Icon, Toast, Form, CellGroup } from "vant";

export default {
  components: {
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Form.name]: Form,
  },
  data() {
    return {
      username: "",
      sms: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    getlog() {
      this.axios
        .post("/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            console.log(res);
            // alert("登录成功");
            // localStorage.userInfo = res.data.userInfo;
            // localStorage.token = res.data.token;
            // localStorage.uid = res.data.uid;

            let { token, uid, userInfo } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("uid", uid);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));

            this.$store.commit("change", { key: "uid", value: uid });
            this.$store.commit("change", { key: "token", value: token });
            this.$store.commit("change", { key: "userInfo", value: userInfo });
            this.$store.commit("change", { key: "isLogin", value: true });

            Toast.success("登录成功");
            this.$router.push("/wode");
          } else {
            Toast.fail("登录失败");
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.misc {
  width: 100%;
  height: 50px;
  background-color: #07c160;
  text-align: center;
  color: #fff;
  font-size: 20px;
  line-height: 50px;
}

.bar {
  background-color: #07c160;
  color: #fff;
}

.misc span {
  padding: 0 5px;
}

.v-button {
  background-color: #ededed;
  border-radius: 15px;
  color: #000;
  border: none;
}

.log {
  width: 90%;
  height: 40px;
  margin: 20px auto;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  background-color: #2fc6ca;
}

.goreg {
  color: rgb(76, 76, 123);
  padding: 20px 20px 0 0;
  float: right;
}
.myLlis {
  margin-top: 50px;
}
</style>
