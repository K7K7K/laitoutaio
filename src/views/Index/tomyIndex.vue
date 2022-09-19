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
          <ul class="artget">
            <CardItem v-for="(item, iv) in lists" :key="iv._id" :item="item" />
          </ul>
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
import CardItem from '@/components/cardItem.vue'
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
    CardItem,
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
      stry: "",
      article_id: "",
      user_id: "",
      loading: false,
      finished: false,
      active_cate_id: "", //分类的每个ID
      skip: 0,
      limit: 10,
      isLoading: false,
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
</style>
