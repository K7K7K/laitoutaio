<template>
  <div class="mylog">
    <div class="misc">
      <van-nav-bar title="修改密码" class="bar" left-text="" left-arrow @click-left="onClickLeft" />
    </div>
    <van-field v-model="username" type="tel" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />

    <van-field v-model="vercode" center clearable label="短信验证码" placeholder="请输入验证码">
      <template #button>
        <van-button class="v-button" size="small" type="primary" @click="getVercodes">发送验证码</van-button>
      </template>
    </van-field>

    <div class="log" @click="getforget">
      <span>修改成功</span>
    </div>
  </div>
</template>

<script>
import { UserForget } from "@/api/home";

import { Field, NavBar, Button, Icon, Toast } from "vant";
export default {
  components: {
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },
  data() {
    return {
      username: "",
      vercode: "",
      password: "",
    };
  },
  methods: {
    getforget() {
      UserForget({
        username: this.username,
        password: this.password,
        vercode: this.vercode,
      })
        // this.axios
        //   .post("/user/forget", {
        //     username: this.username,
        //     password: this.password,
        //     vercode: this.vercode,
        //   })
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            Toast.success("修改成功");
          } else {
            Toast.fail("修改失败");
          }
        })
        .catch((err) => {});
    },
    getVercodes() {
      this.axios
        .post("/user/sendSms", {
          mobile: this.username,
          type: "login",
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            Toast.success("验证码发送成功");
          } else {
            Toast.fail("验证码发送失败");
          }
        })
        .catch((err) => {});
    },
    onClickLeft() {
      this.$router.push("/wode");
    },
  },
};
</script>

<style lang="less">
.misc {
  width: 100%;
  height: 50px;
  background-color: #2fc6ca;
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
  background-color: #07c160;
}

.goreg {
  color: rgb(76, 76, 123);
  padding: 20px 20px 0 0;
  float: right;
}
</style>
