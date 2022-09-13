<template>
  <div class="mylog">
    <div class="mis">
      <van-nav-bar title="注册" class="bar" left-text="" left-arrow />
    </div>
    <van-field v-model="username" type="tel" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />

    <van-field v-model="vercode" center clearable label="短信验证码" placeholder="请输入验证码">
      <template #button>
        <van-button class="v-button" size="small" type="primary" @click="getVercode" :disabled="codevo">{{
          codevos
        }}</van-button>
      </template>
    </van-field>

    <div class="log" @click="getreg">
      <span>确定</span>
    </div>
    <router-link to="/login" tag="span" class="goreg">已有账号，去登录</router-link>
  </div>
</template>

<script>
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
      codevo: false,
      codevos: "发送验证码",
    };
  },
  methods: {
    getreg() {
      this.axios
        .post("/user/reg", {
          username: this.username,
          password: this.password,
          vercode: this.vercode,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            Toast.success("注册成功");
            this.$router.push("/");
          } else {
            Toast.fail("注册失败");
          }
        });
    },
    getVercode() {
      this.codevos = "发送中...";
      this.codevo = true;
      this.axios
        .post("/user/sendSms", {
          mobile: this.username,
          type: "register",
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            // alert("注册成功")
            Toast.success("验证码发送成功");
            let count = 60;
            let timer = setInterval(() => {
              count--;
              this.codevos = `${count}s后获取`;
              this.codevo = true;
              if (count <= 0) {
                clearInterval(timer);
                this.codevos = "再次获取";
                this.codevo = false;
              }
            }, 1000);
          } else {
            // alert("手机号已存在")
            Toast.fail("手机号已存在");
            this.codevos = "再次发送";
            this.codevo = false;
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
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

.goreg {
  color: rgb(76, 76, 123);
  padding: 20px 20px 0 0;
  float: right;
}
</style>
