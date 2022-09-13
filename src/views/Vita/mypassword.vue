<template>
  <div>
    <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="oldpassword"
        name="旧密码"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="newpassword"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" @click="getmypassword">提交</van-button>
      </div>
    </van-form>
    <router-link class="forget" to="/forget" tag="div">忘记密码</router-link>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button, Toast } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      oldpassword: "",
      newpassword: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    getmypassword() {
      this.axios
        .post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/updatePwd", {
          oldPassword: this.oldpassword,
          newPassword: this.newpassword,
          uid: localStorage.getItem("uid"),
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            Toast.success("修改成功");
            this.$router.push("/");
          } else {
            Toast.fail("修改失败");
          }
        });
    },
    onClickLeft() {
      this.$router.push("/wode");
    },
  },
};
</script>

<style lang="less" scoped></style>
