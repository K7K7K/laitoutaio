<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />

    <!-- <van-cell title="头像" is-link /> -->
    <div class="myvita_bc">
      <div class="Tpc">
        <van-image round width="100" height="100" fit="cover" :src="userInfo.avatar" style="margin-top: 15px">
          <input type="file" accept="image/*" class="van-uploader__input" @change="change" />
        </van-image>
      </div>
    </div>

    <van-field v-model="userInfo.nickname" label="昵称" placeholder="请输入昵称"> </van-field>

    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      label="性别"
      placeholder="点击选择性别"
      @click="showPicker = true"
    />

    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>

    <!-- <van-field v-model="shengri" label="生日"> </van-field> -->
    <van-cell title="生日" :value="shengri" @click="show1 = true" />
    <van-calendar v-model="show1" :min-date="minDate" :max-date="maxDate" @confirm="dataonConfirm" />

    <div class="log" @click="getmyvita">
      <span>确定</span>
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Calendar, Form, Field, Picker, Popup, Toast, Image as VanImage } from "vant";
// import { mapState, mapMutations } from "vuex";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Calendar.name]: Calendar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [VanImage.name]: VanImage,
  },
  data() {
    return {
      tetx: "",
      show1: false,
      show: false,
      date: "",
      value: "",
      columns: ["男", "女", "懂得都懂"],
      showPicker: false,
      nickname: "",
      shengri: "",
      // avatar: "https://img0.baidu.com/it/u=1694074520,2517635995&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2010, 0, 31),
      userInfo: {},
    };
  },
  watch: {
    "$store.state.userInfo": {
      immediate: true, //立即进行监听
      handler(n, o) {
        this.userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo));
      },
    },
  },
  // created() {
  //   //数据回填
  //   //刷新会没有
  //   this.userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo)); //深度拷贝vuex里的userInfo
  //   console.log(this.userInfo);
  // },
  methods: {
    ...mapActions(["upload"]),

    formatDate(shengri) {
      return `${shengri.getMonth() + 1}/${shengri.getDate()}`;
    },
    dataonConfirm(shengri) {
      this.show1 = false;
      this.shengri = this.formatDate(shengri);
    },

    // dataonConfirm() {
    //   this.show1 = false;
    // },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    async getmyvita() {
      // let { avatar, file } = this.userInfo;
      let { _id, nickname, avatar, file, sex = "", birthday = "" } = this.userInfo;
      if (file) {
        let fileList = [{ file }]; //和want上传组件形状一样
        let res = await this.upload(fileList);
        console.log(res);
        avatar = res[0];
      }

      localStorage.birthday = this.date;
      this.axios
        .post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/editUserInfo", {
          birthday: this.shengri,
          nickname,
          sex: this.value,
          uid: localStorage.getItem("uid"),
          avatar,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            Toast.success("修改成功");
            this.$store.dispatch("getUserInfo", localStorage.getItem("token"));
            this.$router.back();
          } else {
            Toast.fail("修改失败");
          }
        })
        .catch((err) => {});
    },
    onClickLeft() {
      this.$router.push("/wode");
    },
    //上传头像
    async change(e) {
      console.log(e.target.files);
      let file = e.target.files[0];
      this.userInfo.file = file;
      //  前端预览
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        this.userInfo.avatar = e.target.result;
      };

      // let fileList = [{ file }]; //和want上传组件形状一样
      // let res = await this.upload(fileList);
      // console.log(res);
    },
  },
};
</script>

<style lang="less">
.van-nav-bar {
  background-color: #2fc6ca;
}
.van-nav-bar__title {
  color: #fff;
}
.confirm {
  width: 85%;
  margin: 25px auto;
}
.van-uploader__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
}
.myvita_bc {
  width: 100%;
  height: 150px;
  background-color: #000;
  background-image: url("@/assets/img/123.png");
  background-size: 100% 100%;
}
.Tpc {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
</style>
