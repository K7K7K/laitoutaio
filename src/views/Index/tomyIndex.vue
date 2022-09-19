<template>
  <div>
    <div class="search" @click="to_search">
      <van-search v-model="value" shape="round" background="#2fc6ca" placeholder="搜索" input-align="center" />
    </div>

    <div class="nav">
      <van-tabs class="fix1" v-model="active" border @click="getdj">
        <van-tab v-for="item in list" :key="item._id" :title="item.name"> </van-tab>
      </van-tabs>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
          @load="getArtList" style="padding: 95px 0">
          <div class="artget">
            <ul v-for="(item, iv) in lists"
              :class="[item.imageSrc.length == 1 ? 'tomyone_v' : item.imageSrc.length == 0 ? 'tomyson' : 'tomytow']"
              :key="iv._id" @click="toindex(item, iv)">
              <!-- 标题 -->
              <div>aaaaa</div>
              <h3 class="max-p">{{ item.title }}</h3>
              <!-- <p>{{ item.author }}</p> -->
              <div class="pc1fu">
                <!-- <img class="topc1" alt="" :src="img" v-for="(img, i) in item.imageSrc" :key="i" /> -->
                <!-- 图片懒加载 -->
                <img class="topc1" alt="" v-for="(img, i) in item.imageSrc" v-lazy="img" :key="i" />
                <!-- <div class="content" v-if="item.imageSrc.length == 0"> </div> -->
              </div>
              <div class="getBottom_v">
                <span class="max-p">{{ item.author }}</span>
                <span>{{ item.comment }}评论</span>
              </div>
            </ul>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="goToTop" @click="goToTop">
      <van-icon class="toicon1" color="#fff" name="back-top" />
    </div>
  </div>
</template>

<script>
import { getCateList, GetArtList } from "@/api/home";

import {
  Search,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Image as VanImage,
  List,
  PullRefresh,
  Icon,
  Lazyload,
} from "vant";

export default {
  components: {
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    [Lazyload.name]: Lazyload,
  },
  data() {
    return {
      value: "",
      active: 0,
      item: 1,
      list: [],
      lists: [],
      // awais: [],
      stry: "",
      article_id: "",
      user_id: "",
      loading: false,
      finished: false,
      active_cate_id: "", //分类的每个ID
      skip: 0,
      limit: 10,
      isLoading: false,
      img: [],
      a1: [],
      show5: false,
      show6: false,
    };
  },

  mounted() {
    this.getCate();
  },
  methods: {
    onRefresh() {
      this.skip = 0;
      this.finished = false;
      this.lists = [];

      this.getArtList(true);
    },
    getdj() {
      //获取当前索引ID
      this.active_cate_id = this.list[this.active]._id;
      this.skip = 0;
      this.finished = false;
      this.lists = [];

      this.getArtList();
    },

    getCate() {
      //获取分类列表
      getCateList().then((res) => {
        console.log(res.data);
        this.list = res.data;
        console.log(this.list);
        this.active_cate_id = this.list[this.active]._id;
        this.getArtList();
      });
    },
    //获取文章列表
    getArtList(flag) {
      let { active_cate_id, skip, limit } = this;
      GetArtList({
        cate_id: active_cate_id,
        skip,
        limit,
      }).then((res) => {
        //图片压缩

        res.data = res.data.map((v) => {
          if (v.imageSrc) {
            v.imageSrc = v.imageSrc.map((v) => {
              return v + "?imageslim";
            });
          }
          return v;
        });
        console.log(res);

        setTimeout((v) => {
          if (flag) {
            this.isLoading = false;
            this.lists = res.data;
          }
        }, 1000);
        this.lists.push(...res.data);

        let len = this.lists.length;
        console.log(len);
        if (len >= res.count) {
          this.finished = true;
        } else {
          this.skip = len;
          this.loading = false;
        }
        //如果加载完了 finished=true
        //没有 loading = false
      });
    },
    //跳文章详情
    toindex(item, iv) {
      console.log(this.lists[iv]._id);
      this.$router.push({
        name: "artdet",
        query: {
          article_id: this.lists[iv]._id,
          user_id: this.lists[iv].author_id2,
        },
      });
    },
    //回到顶部
    goToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    to_search() {
      this.$router.push("/mysearch");
    },
  },
};
</script>

<style lang="less" scoped>
body {
  background-color: #f5f7f9;
}

.search {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  z-index: 999;
}

.fix1 {
  width: 100%;
  height: 40px;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 999;
}

.v-grid {
  width: 100%;
  height: 100px;
}

.goToTop {
  width: 30px;
  height: 30px;
  position: fixed;
  bottom: 100px;
  right: 10px;
  background-color: #000;
  opacity: 0.5;
  border-radius: 50%;
}

.toicon1 {
  margin: 5px 0 0 7px;
}

.getBottom_v {
  margin: 7px 0;
}

.tomyone_v {
  width: 100%;
  height: 350px;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 10px;

  .max-p {
    margin: 15px 10px 10px 10px;
    // display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    //强制英文单词换行 数字
    word-break: break-all;
  }

  .pc1fu {
    width: 100%;
    height: 70%;

    img {
      width: 100%;
      height: 100%;
      // max-height: 100%;
      object-fit: cover;
    }
  }
}

.tomytow {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 10px;

  .max-p {
    margin: 15px 10px 10px 10px;
    // display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    //强制英文单词换行 数字
    word-break: break-all;
  }

  .pc1fu {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-around;

    img {
      width: 30%;
      height: 100%;
    }
  }
}

.tomyson {
  width: 100%;
  height: 100px;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 10px;

  .max-p {
    margin: 15px 10px 10px 10px;
    // display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    //强制英文单词换行 数字
    word-break: break-all;
  }

  .pc1fu {
    width: 100%;
    // height: 46%;
    display: flex;
    justify-content: space-around;

    img {
      width: 30%;
      // height: 100%;
    }
  }
}
</style>
