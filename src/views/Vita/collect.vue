<template>
  <div>
    <div class="misc">
      <van-nav-bar title="收藏列表" class="bar" left-text="" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="collect_v">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="getList">
        <ul v-for="(item, iv) in list" :key="iv" class="toul" @click="toindex(iv)">
          <h3 class="max-p">{{ item.title }}</h3>
          <!-- <p>作者：{{ item.author }}</p> -->
          <div>
            <img class="pc1" alt="" :src="img" v-for="(img, i) in item.imageSrc" :key="i" />
          </div>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
// import { getFavList } from "@api/home";
import { NavBar, List } from "vant";

import { getFavList } from "@/api/home";

export default {
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
  },
  data() {
    return {
      user_id: localStorage.getItem("uid"),
      list: [],
      skip: 0,
      limit: 5,
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let { active_cate_id, skip, limit } = this;
      getFavList({ user_id: this.user_id, skip, limit }).then((res) => {
        console.log(res);
        if (res.code == "0") {
          this.list.push(...res.data);
          let len = this.list.length;
          console.log(len);
          console.log(res.count);
          if (len >= res.count) {
            this.finished = true;
          } else {
            this.skip = len;
            this.loading = false;
          }
        }
      });
    },
    //跳文章详情
    toindex(iv) {
      console.log(this.list[iv]._id);
      this.$router.push({
        name: "artdet",
        query: {
          article_id: this.list[iv]._id,
          //   user_id: this.list[iv].author_id2,
        },
      });
    },

    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style  lang="less">
.toul {
  max-width: 100%;
  overflow: hidden;
}

.nav p {
  text-align: center;
}

.p:nth-child(2) {
  font-size: 12px;
  padding-top: 10px;
}

.pc1 {
  width: 100%;
}

.collect_v {
  margin-top: 40px;
}
</style>
