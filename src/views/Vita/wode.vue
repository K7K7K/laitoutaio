<template>
  <div class="wode">
    <div class="warp" v-if="isLogin">
      <div class="item">
        <span class="pc">
          <van-image round width="5rem" height="5rem" :src="userInfo.avatar" />
          <span class="name">{{ userInfo.nickname }}</span>
        </span>
        <span>
          <div>
            <router-link to="/myvita" tag="button" class="btn">编辑资料</router-link>
          </div>
        </span>
      </div>
      <div class="toutiao">
        <div @click="getmyfabu">
          <p>{{ onelist.liked_num }}</p>
          <p>头条</p>
        </div>
        <div>
          <p>{{ onelist.publish_num }}</p>
          <p>获赞</p>
        </div>
      </div>
    </div>

    <div class="warp" v-else>
      <div class="item1">
        <span class="pc">
          <van-image round width="5rem" height="5rem" :src="pcs" />
        </span>
      </div>
      <p class="logreg"><span @click="getlogin">登录</span>/<span @click="getreg">注册</span></p>
    </div>

    <van-grid clickable :column-num="2" class="van-grid-n">
      <van-grid-item icon="star-o" text="收藏" to="collect" />
      <van-grid-item icon="underway-o" text="历史" to="/historie" />
    </van-grid>
    <div class="amead">
      <van-cell title="修改密码" is-link to="mypassword" />
      <van-cell title="联系我们" is-link to="/contactUs" />
      <van-cell title="关于我们" is-link to="/AboutUs" />
    </div>
    <!-- <van-nav-bar title="" /> -->
    <!-- <router-link to="/" tag="div" class="v-title">退出登录</router-link> -->
    <div class="v-title" @click="logout" v-if="isLogin">退出登录</div>
  </div>
</template>

<script>
import { Image as VanImage, Uploader, Button, Grid, GridItem, Cell, CellGroup, NavBar, Dialog } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    [VanImage.name]: VanImage,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      list: [],
      onelist: [],
      pcs: ["https://i.postimg.cc/5NfQKcNQ/3c54726706ea4a1eb4bbafe323e82cda-400x400.png"],
    };
  },
  created() {
    //   let { uid, token, userInfo } = localStorage;
    //   if (uid) {
    //     this.isLogin = true;
    //   } else {
    //     this.isLogin = false;
    //   }
  },
  computed: {
    //从vuex拿
    ...mapState(["uid", "token", "isLogin", "userInfo"]),
    // uid() {
    //   return this.$store.state.uid;
    // },
    // token() {
    //   return this.$store.state.token;
    // },
  },
  created() {
    this.axios
      .post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/user/getuserInfo", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res);
        this.onelist = res.data;
        this.list = res.data.userInfo;
        console.log(this.list);
      })
      .catch((err) => {});
  },
  mounted() {},
  methods: {
    ...mapMutations(["clear"]),
    async logout() {
      let res = await Dialog.confirm({
        title: "退出",
        message: "确定退出吗",
      });

      if (res == "confirm") {
        // console.log("a");
        localStorage.clear();
        this.clear();
        // this.$router.push("/login");
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    //去登录
    getlogin() {
      this.$router.push("/login");
    },
    //去注册
    getreg() {
      this.$router.push("/reg");
    },
    //头条 去我的发布列表
    getmyfabu() {
      this.$router.push("/myfabu");
    },
  },
};
</script>

<style lang="less">
.warp {
  width: 100%;
  height: 200px;
  // background-color: #4dae45;
  background-image: url("@/assets/img/on2.png");
  background-size: 100% 208.21px;
  color: #fff;
  font-size: 20px;
}

.item {
  padding-top: 35px;
  width: 100%;
  height: 80px;
  // padding: 35px 10px 0 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  border-radius: 15px;
  font-size: 16px;
  color: #000;
  padding: 3px 10px;
  margin-right: 10px;
  border: none;
  background-color: #ccc;
}

.pc {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.toutiao {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

.toutiao p {
  font-size: 16px;
  text-align: center;
}

.amead {
  margin: 7px 0;
}

.v-title {
  width: 85%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #da6b72;
  font-size: 16px;
  background-color: #ccc;
  margin: 0 auto;
  color: #fff;
  margin-top: 20px;
}
.item1 {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}
.logreg {
  text-align: center;
  margin-top: 10px;
  color: #ccc;
}
.logreg span {
  padding: 0 5px;
}
.name {
  color: #ccc;
}
</style>
