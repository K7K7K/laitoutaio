<template>
  <div>
    <div class="misc">
      <van-nav-bar title="历史浏览" class="bar" left-text="" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="myfabu_v">
      <ul v-for="(item, iv) in list" :key="iv" class="toul" @click="toindex(iv)">
        <p class="max-p">标题：{{ item.title }}</p>
        <p>作者：{{ item.author }}</p>
        <div>
          <img class="pc1" alt="" :src="img" v-for="(img, i) in item.imageSrc" :key="i" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getHistoryList } from "@/api/home";
import { NavBar } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      user_id: localStorage.getItem("uid"),
      list: [],
      skip: 0,
      limit: 10,
    };
  },
  computed: {
    // ...mapState(["uid"]),
  },
  mounted() {
    let { active_cate_id, skip, limit } = this;

    getHistoryList({
      uid: this.user_id,
      skip,
      limit,
    })
      .then((res) => {
        console.log(res);
        if (res.code == "0") {
          this.list = res.data;
        }
      })
      .catch((err) => {});
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
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
  },
};
</script>

<style lang="less">
.toul {
  max-width: 100%;
  overflow: hidden;
  margin-top: 10px;
  background-color: #fff;
}
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
</style>
