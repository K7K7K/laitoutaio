<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="getList"
        style="padding-bottom: 50px"
      >
        <!-- <ul v-for="(item, iv) in list" :key="iv._id" class="toul">
          <p class="max-p">主题：{{ item.title }}</p>
          <p>作者：{{ item.author }}</p>
          <div>
            <img class="pc1" alt="" :src="img" v-for="(img, i) in item.imageSrc" :key="i" />
          </div>
        </ul> -->
        <ul v-for="(item, iv) in list" :key="iv._id" class="toul" @click="toindex(item, iv)">
          <!-- 标题 -->
          <h3 class="max-p">{{ item.title }}</h3>
          <!-- <p>{{ item.author }}</p> -->
          <div class="pc1fu">
            <!-- <img class="topc1" alt="" :src="img" v-for="(img, i) in item.imageSrc" :key="i" /> -->
            <!-- 图片懒加载 -->
            <img class="topc1" alt="" v-for="(img, i) in item.imageSrc" v-lazy="img" :key="i" />
          </div>
          <div class="getBottom_v">
            <span class="max-p">{{ item.author }}</span>
            <span>{{ item.comment }}评论</span>
          </div>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, PullRefresh } from "vant";
import { Search } from "@/api/home";

export default {
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  name: "searchList",
  data() {
    return {
      loading: false,
      finished: false,
      skip: 0,
      limit: 10,
      isLoading: false,
      list: [],
      key_word: this.$route.query.key_word,
    };
  },
  created() {
    console.log(this.$route.query.key_word);
    this.getList();
  },
  methods: {
    getList() {
      Search({
        key_word: this.key_word,
        skip: this.skip,
        limit: this.limit,
      }).then((res) => {
        console.log("a");
        console.log(res.data);
        // if (res.data.code == "0") {
        this.list.push(...res.data);
        let len = this.list.length;
        if (len >= res.count) {
          this.finished = true;
        } else {
          this.skip = len;
          this.loading = false;
        }
        // }
      });
    },
    onRefresh() {},
    toindex(item, iv) {
      console.log(this.list[iv]._id);
      this.$router.push({
        name: "artdet",
        query: {
          article_id: this.list[iv]._id,
        },
      });
    },
  },
};
</script>

<style></style>
