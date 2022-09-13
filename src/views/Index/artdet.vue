<template>
  <div class="artdet">
    <van-nav-bar fixed placeholder title="文章详情" class="bar" left-text="" left-arrow @click-left="onClickLeft" />
    <div class="warp-artget">
      <h2 class="art-h2">{{ list.title }}</h2>
      <div class="art-item">
        <div class="left">
          <van-image round width="4rem" height="4rem" :src="list.avatar" />
        </div>
        <div class="div">
          <h5>{{ list.author }}</h5>
          <span>{{ list.time | formatDate }}</span>
        </div>
        <div class="right">
          <van-switch v-model="checked" size="24px" />
          <p>关注</p>
        </div>
      </div>
      <div class="art">
        {{ list.content }}
      </div>

      <van-divider :style="{ color: '#1989fa', borderColor: '#2fc6ca', padding: '0 16px' }"> 热门评论 </van-divider>
      <!-- 一级评论列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :finished-text="lists.length ? '没有更多了' : '抢沙发'"
        @load="getList_v"
      >
        <div class="comment" v-for="(item, index) in lists" :key="index">
          <div class="art-item">
            <div class="left">
              <van-image round width="4rem" height="4rem" :src="item.info.avatar" />
            </div>
            <div class="div">
              <h5>{{ item.info.nickname }}</h5>
              <span>{{ item.create_time | formatDate }}</span>
            </div>
            <!-- 评论点赞------------------------------------------------------- -->

            <div class="right" @click="artItem(item, index)">
              <van-icon name="good-job-o" size="30" :style="{ color: item.is_like ? 'red' : '#000' }" />
              <!-- 点赞数量 -->
              <span>{{ item.like_count }}</span>
            </div>
          </div>
          <div class="huifu">
            <p>{{ item.content }}</p>

            <span>{{ item.create_time | formatDate }}</span>

            <span>
              <!-- 传 -->
              <button class="btnv" @click="artbtnv(item, index)">
                <span>{{ item.reply_num == 0 ? "0" : item.reply_num }}</span>
                <!-- <span>{{ lists.reply_num }}</span> -->
                <span>回复</span>
              </button>
            </span>
          </div>
        </div>
      </van-list>

      <div class="warpa"></div>

      <!-- 回复的回复 -->
      <van-popup v-model="show1" closeable position="bottom" :style="{ height: '100%' }">
        <div class="a7">
          <!-- <h3 class="artItemh2">回复</h3> -->
          <van-nav-bar
            fixed
            placeholder
            title="回复"
            style="background: red"
            class="bar"
            left-text=""
            left-arrow
            @click-left="onClickLeft"
          />

          <div class="art-item">
            <div class="left">
              <van-image round width="4rem" height="4rem" :src="items1.avatar" />
            </div>
            <div class="div">
              <h5>{{ items1.nickname }}</h5>
              <span>{{ items1.create_time | formatDate }}</span>
            </div>
            <!-- 评论点赞------------------------------------------------------- -->

            <div class="right" @click="artItem(items)">
              <van-icon name="good-job-o" size="30" :style="{ color: items.is_like ? 'red' : '#000' }" />
              <!-- 点赞数量 -->
            </div>
          </div>
          <div class="huifu">
            <p>{{ items.content }}</p>

            <span>{{ items.create_time | formatDate }}</span>

            <span
              ><button class="btnv"><span></span> <span>回复</span></button></span
            >
          </div>
          <div class="cut-off-rule"></div>
        </div>

        <!-- 回复谁 -->
        <div style="padding: 197px 0">
          <!-- 回复列表 -->
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="tolist.length ? '没有更多了' : '抢沙发'"
            @load="artbtnv"
          >
            <div class="comment" v-for="(item, index) in tolist" :key="index">
              <div class="art-item">
                <div class="left">
                  <van-image round width="4rem" height="4rem" :src="item.info.avatar" />
                </div>
                <div class="div">
                  <h5>{{ item.info.nickname }}</h5>
                  <span>{{ item.create_time | formatDate }}</span>
                </div>
                <!-- 评论点赞------------------------------------------------------- -->

                <div class="right" @click="artItem(item, index)">
                  <van-icon name="good-job-o" size="30" :style="{ color: item.is_like ? 'red' : '#000' }" />
                  <!-- 点赞数量 -->
                  <span></span>
                </div>
              </div>
              <div class="huifu">
                <p>{{ item.content }}</p>

                <span>{{ item.create_time | formatDate }}</span>

                <span
                  ><button class="btnv"><span></span> <span>回复</span></button></span
                >
              </div>
            </div>
          </van-list>
        </div>
        <div class="fabuhuifu">
          <van-field
            v-model="message"
            rows="2"
            autosize
            label="评论"
            type="textarea"
            maxlength="50"
            placeholder="请输入评论"
            show-word-limit
          />

          <div class="fabupinglun" @click="fabupinluns">发布评论</div>
        </div>
        <!-- 发布回复的回复 -->
      </van-popup>
      <!-- 发布评论 -->
      <div class="act-fooert">
        <!-- <input type="text" placeholder="写评论" v-model="comment" /> -->
        <button class="art_forget_btn" @click="show = true" is-link>发布评论</button>
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
          <van-form @submit="onSubmit">
            <van-field
              v-model="artconter"
              name="写评论"
              label="写评论"
              placeholder="写评论"
              :rules="[{ required: true, message: '请填写评论' }]"
            />

            <div style="margin: 16px">
              <van-button round block type="info" native-type="submit" @click="getart_item">发布</van-button>
            </div>
          </van-form>
        </van-popup>
        <span>
          <van-icon name="comment-o" size="25" badge="" />
          <!-- {{ lists.lenght }} -->
          <i class="icon_1_v">{{ plcount }}</i>
        </span>
        <span>
          <van-icon name="star-o" size="25" @click="artshoucang" :style="{ color: list.is_fav ? 'red' : '#000' }" />
        </span>
        <span>
          <van-icon
            name="good-job-o"
            size="25"
            @click="artwzdianzan"
            :style="{ color: list.is_like ? 'red' : '#000' }"
          />
        </span>
        <span @click="showShare = true">
          <van-icon name="share-o" size="25" />
        </span>
      </div>

      <!-- 分享 -->
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
    </div>
  </div>
</template>

<script>
import { getUserArtList } from "@/api/home";
import {
  NavBar,
  Image as VanImage,
  Switch,
  Icon,
  Button,
  Popup,
  Field,
  Uploader,
  Picker,
  Empty,
  ActionSheet,
  Cell,
  CellGroup,
  Form,
  Toast,
  List,
  ShareSheet,
  Divider,
} from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [VanImage.name]: VanImage,
    [Switch.name]: Switch,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Popup.name]: Popup,

    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Empty.name]: Empty,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Toast.name]: Toast,
    [List.name]: List,
    [ShareSheet.name]: ShareSheet,
    [Divider.name]: Divider,
  },

  data() {
    return {
      checked: "",
      article_id: this.$route.query.article_id,
      user_id: localStorage.getItem("uid"),
      list: [],
      lists: [],
      comment: "",
      display: false,
      show: false,
      show1: false,
      show3: false,
      artconter: "",
      tolist: "",
      message: "",
      items: "",
      items1: "",
      zhongjianjie: "",
      loading: false,
      finished: false,
      plcount: "",
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "QQ", icon: "qq" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      skip: 0,
      limit: 10,
    };
  },
  mounted() {
    //获取文章
    console.log(this.$route.query.article_id);
    // console.log(this.article_id);
    this.axios
      .post("/api/get_article_detail", {
        article_id: this.article_id,
        user_id: this.user_id,
      })
      .then((res) => {
        console.log(res.data.data);
        this.list = res.data.data;
        // console.log(this.list.length);
      });
    //评论列表
    // getUserArtList({
    //   article_id: this.article_id,
    //   skip: "0",
    //   limit: 4,
    //   user_id: this.user_id,
    // }).then((res) => {
    //   console.log(1);
    //   console.log(res);
    //   this.lists = res.data.data;
    // });
    this.getList_v();
  },
  methods: {
    getList_v() {
      let { skip, limit } = this;
      this.axios
        .post("/api/get_comment_list", {
          article_id: this.article_id,
          skip,
          limit,
          user_id: this.user_id,
        })
        .then((res) => {
          console.log(res);
          this.lists.push(...res.data.data);
          let len = this.lists.length;
          console.log(res.data.count);
          if (len >= res.data.count) {
            this.finished = true;
          } else {
            this.skip = len;
            this.loading = false;
          }
          this.plcount = this.lists.length;
          console.log(this.plcount);
        });
    },

    //分享
    onSelect({ name }) {
      let title = this.list.title;
      let href = window.location.href;
      switch (name) {
        case "微信":
          break;
        case "QQ":
          window.location.href = `http://connect.qq.com/widget/shareqq/iframe_index.html?title=${title}&href=${href}$content=${title}`;
          break;
        case "微博":
          window.location.href = `http://service.weibo.com/share/share.php?title=${title}&href=${href}$content=${title}`;
          break;
        case "复制链接":
          break;
        case "分享海报":
          break;
        case "二维码":
          break;
      }
    },
    //一级评论
    getart_item() {
      this.show = false;
      this.axios
        .post("/api/add_comment", {
          user_id: this.user_id,
          article_id: this.article_id,
          comment_type: "0",
          reply_comment_id: "0",
          content: this.artconter,
        })
        .then((res) => {
          // console.log(res);
          //重新渲染评论列表
          this.axios
            .post("/api/get_comment_list", {
              article_id: this.article_id,
              skip: "0",
              limit: "30",
              user_id: this.user_id,
            })
            .then((res) => {
              this.lists = res.data.data;
              //重新渲染数量
              this.plcount = this.lists.length;
            })
            .catch((err) => {});
          if (res.data.code == "0") {
            console.log(res + "1");
          } else {
            console.log(res);
          }
        })
        .catch((err) => {});
    },
    //调回复列表

    artbtnv(item) {
      console.log(item);
      this.zhongjianjie = item._id;
      this.items = item;
      this.items1 = item.info;
      this.show1 = true;
      this.axios
        .post("/api/get_reply_list", {
          article_id: this.article_id,
          skip: "0",
          limit: "10",
          comment_type: "1",
          reply_comment_id: this.items._id,
          user_id: this.user_id,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.data);
          this.tolist = res.data.data;
        });

      // this.display = !this.display;
    },

    //一级评论点赞
    artItem(item, index) {
      console.log(item, index);
      item.is_like = !item.is_like;
      if (item.is_like == true) {
        this.axios
          .post("/api/comment_like", {
            user_id: localStorage.getItem("uid"),
            comment_id: item._id,
          })
          .then((res) => {
            if (res.data.code == "0") {
              Toast.success("点赞成功");
              console.log(res);
              //重新调用评论列表
              this.axios
                .post("/api/get_comment_list", {
                  article_id: this.article_id,
                  skip: "0",
                  limit: "30",
                  user_id: this.user_id,
                })
                .then((res) => {
                  console.log(res.data.data);
                  this.lists = res.data.data;
                });
            } else {
              Toast.fail("点赞失败");
            }
          });
      } else {
        this.axios
          .post("/api/comment_unlike", {
            user_id: localStorage.getItem("uid"),
            comment_id: item._id,
          })
          .then((res) => {
            if (res.data.code == "0") {
              Toast.success("取消点赞成功");
              console.log(res);
              //重新调用评论列表
              this.axios
                .post("/api/get_comment_list", {
                  article_id: this.article_id,
                  skip: "0",
                  limit: "30",
                  user_id: this.user_id,
                })
                .then((res) => {
                  console.log(res.data.data);
                  this.lists = res.data.data;
                });
            } else {
              Toast.fail("取消点赞失败");
            }
          });
      }
    },
    //收藏
    artshoucang() {
      this.list.is_fav = !this.list.is_fav;
      if (this.list.is_fav == true) {
        this.axios
          .post("/api/add_fav", {
            article_id: this.article_id,
            user_id: this.user_id,
          })
          .then((res) => {
            console.log(res);
            console.log(this.article_id);
            Toast.success("收藏成功");
          });
      } else {
        this.axios
          .post("/api/remove_fav", {
            article_id: this.article_id,
            user_id: this.user_id,
          })
          .then((res) => {
            console.log(res);
            console.log(this.article_id);
            Toast.fail("取消收藏成功");
          });
      }
    },
    //文章点赞
    artwzdianzan() {
      this.list.is_like = !this.list.is_like;
      if (this.list.is_like == true) {
        this.axios
          .post("/api/like", {
            user_id: this.user_id,
            article_id: this.article_id,
          })
          .then((res) => {
            console.log(res);
            Toast.success("点赞成功");
          })
          .catch((err) => {});
      } else {
        this.axios
          .post("/api/unlike", {
            user_id: this.user_id,
            article_id: this.article_id,
          })
          .then((res) => {
            console.log(res);
            Toast.fail("取消点赞成功");
          })
          .catch((err) => {});
      }
    },
    //回复评论
    fabupinluns() {
      this.axios
        .post("/api/add_comment", {
          user_id: this.user_id,
          article_id: this.article_id,
          comment_type: "1",
          reply_comment_id: this.zhongjianjie,
          content: this.message,
        })
        .then((res) => {
          //重新渲染回复列表

          this.axios
            .post("/api/get_reply_list", {
              article_id: this.article_id,
              skip: "0",
              limit: "10",
              comment_type: "1",
              reply_comment_id: this.items._id,
              user_id: this.user_id,
            })
            .then((res) => {
              this.tolist = res.data.data;
            });
          if (res.data.code == "0") {
            console.log(res);
            Toast.success("评论成功");
          } else {
            Toast.fail("评论失败");
            cnosole.log(res);
          }
        });
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    //list加载
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.lists.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.lists.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onClickLeft() {
      this.$router.back();
    },
  },
  //过滤器
  filters: {
    formatDate: function (value) {
      // 时间戳转换日期格式方法
      if (value == null) {
        return "";
      } else {
        let date = new Date(value);
        let y = date.getFullYear(); // 年
        let MM = date.getMonth() + 1; // 月
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate(); // 日
        d = d < 10 ? "0" + d : d;
        // let h = date.getHours(); // 时
        // h = h < 10 ? "0" + h : h;
        // let m = date.getMinutes(); // 分
        // m = m < 10 ? "0" + m : m;
        // let s = date.getSeconds(); // 秒
        // s = s <script 10 ? "0" + s : s;
        // return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
        return y + "-" + MM + "-" + d;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.artdet {
  h2 {
    width: 100%;
    height: 60px;
    line-height: 60px;
  }

  .warp-artget {
    padding: 0px 15px;

    .art-h2 {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      //强制英文单词换行 数字
      word-break: break-all;
    }
  }

  .art-item {
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;

    .div {
      width: 200px;
      padding-top: 10px;
    }

    .right {
      width: 50px;
      color: red;
    }
  }

  .art {
    margin: 30px 0;
    font-size: 18px;
    width: 100%;
    overflow: hidden;
  }
}

.btnv {
  width: 60px;
  height: 25px;
  border-radius: 15px;
  background-color: #fff;
  //   border: none;
  border: 1px solid #ccc;
}

.huifu {
  padding-left: 60px;

  p {
    // word-wrap: break-word;
    // word-break: break-all;
    word-break: break-all;
    word-wrap: break-word;
    // width: 90vw;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    //代码设置了宽度100px的文本，超过四行省略号显示
  }
}

.act-fooert {
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;

  .art_forget_btn {
    width: 50%;
    height: 70%;
    border-radius: 15px;
    text-align: center;
    // line-height: 70%;
    margin: 10px 10px;
  }
}
.act-fooert span {
  margin-top: 1.33333vw;
  display: block;
  padding: 0 10px;
  position: relative;
}
.icon_1_v {
  display: block;
  position: absolute;
  right: 5px;
  top: -7px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: #07c160;
  color: #fff;
  font-size: 10px;
  text-align: center;
  line-height: 17px;
}
.red {
  color: red;
}

.artItemh2 {
  width: 100%;
  height: 60px;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
}

.fabupinglun {
  width: 100%;
  height: 40px;
  background-color: blue;
  color: #fff;
  line-height: 40px;
  text-align: center;
}

.fabuhuifu {
  width: 100%;
  position: fixed;
  bottom: 0;
}

.warpa {
  width: 100%;
  height: 50px;
}
.misc {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #07c160;
  z-index: 999;
}
.a7 {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  z-index: 2;
}
//分割线
.cut-off-rule {
  width: 100%;
  height: 2px;
  background-color: #000;
  // margin: 174px 0 10px 0;
  margin: 10px 0;
}
.van-icon {
  position: absolute;
  z-index: 9999;
  color: #c8c9cc;
  font-size: 5.86667vw;
  cursor: pointer;
}
</style>
