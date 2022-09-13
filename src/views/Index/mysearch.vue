<template>
  <div>
    <form action="/" class="a2">
      <van-search
        v-model="value"
        show-action
        :placeholder="houts"
        @input="onInput"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>
    <div v-show="SearchList.length" class="SearchList">
      <van-cell
        :title="item.title"
        v-for="(item, index) in SearchList"
        :key="index"
        @click="searchListtop(item, item.title)"
      >
      </van-cell>
    </div>
    <div>
      <div>
        <van-cell title="搜索历史">
          <div>
            <span @click="removeAll">全部删除</span>
          </div>
        </van-cell>
      </div>
      <van-cell
        :title="item"
        v-for="(item, i) in history"
        :key="i"
        :to="{ path: '/searchList', query: { key_word: item } }"
      >
        <van-icon name="close" @click="remove(i)" />
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Toast, Search, Cell, Icon, CellGroup } from "vant";
import { Search as Searchapi } from "@/api/home";

//封装防抖
function debounce(fn, t = 500) {
  let timer = null;
  return function (...arg) {
    clearInterval(timer);
    timer = setTimeout((v) => {
      fn.apply(this, arg);
    }, t);
  };
}

export default {
  components: {
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },
  data() {
    return {
      value: "",
      houts: "二舅",
      SearchList: [],
      history: [],
      wzId: "",
      user: [],
    };
  },
  created() {
    //创建完成后 判断历史记录
    let history = localStorage.getItem("history");
    // 1,没有搜索过没记录 undefined
    // 2,有记录
    if (history) {
      this.history = JSON.parse(history);
    }
  },
  watch: {
    value(n) {
      if (n.trim().length === 0) {
        this.SearchList = [];
      }
    },
  },

  methods: {
    onInput: debounce(function (e) {
      console.log(e);
      e = e.trim(); //去掉前后空格
      e = e || this.houts;
      if (e.length == 0) return;
      Searchapi({
        key_word: e,
      }).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.SearchList = res.data;
          console.log(this.SearchList);
        }
      });
    }),
    // onInput(e) {
    //   e = e.trim(); //去掉前后空格
    //   if (e.length == 0) return;
    //   Searchapi({
    //     key_word: e,
    //   }).then((res) => {
    //     console.log(res);
    //     if (res.code == 0) {
    //       this.SearchList = res.data;
    //       // this.wzId = res.data[0]._id;
    //       // console.log(this.wzId);
    //       console.log(this.SearchList);
    //     }
    //   });
    // },
    onSearch(e) {
      e = e.trim();
      e = e || this.houts;
      Toast(e);
    },
    searchListtop(item, title) {
      console.log(item);
      console.log(item._id);
      let index = this.history.findIndex((v) => v === title); //title 和数组每一项进行比较，有返回索引 没有返回-1
      if (index >= 0) {
        //有一样先删除
        this.history.splice(index, 1);
      }
      //存在数组第一项
      this.history.unshift(title);
      console.log(this.history);
      localStorage.setItem("history", JSON.stringify(this.history));

      // localStorage.history = this.history;
      console.log(this.history);

      // this.$router.push({ path: "/searchList", query: { key_word: title } });
      this.$router.push({
        name: "artdet",
        query: {
          article_id: item._id,
          // user_id: this.lists[iv].author_id2,
        },
      });
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    //全部删除
    removeAll() {
      this.history = [];
      localStorage.history = this.history;
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    //删除一个
    remove(i) {
      this.history.splice(i, 1);
      localStorage.history = this.history;
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    //跳详情页
    // getartdet() {
    //   this.$router.push({
    //     name: "artdet",
    //     query: {
    //       article_id: this.SearchList[index]._id,
    //       // user_id: this.lists[iv].author_id2,
    //     },
    //   });
    // }
  },
};
</script>

<style lang="less">
.SearchList {
  // position: fixed;
  // left: 0;
  // top: 100px;
  // z-index: 999;
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
  z-index: 999;
  background: #fff;
}
</style>
