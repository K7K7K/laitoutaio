<template style="display: fixed">
  <div id="index">
    <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view>

    <div class="index">
      <div class="Tabbar">
        <van-tabbar v-model="active" class="MyIndex" route>
          <van-tabbar-item icon="home-o" to="/index"> 首页 </van-tabbar-item>

          <van-tabbar-item icon="add-o" to="/fabu"> 发布 </van-tabbar-item>

          <van-tabbar-item icon="manager-o" to="/wode"> 我的 </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
  },
  data() {
    return {
      active: "",
      icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },
};
</script>

<style lang="less">
.MyIndex {
  width: 100%;
  display: flex;
  justify-content: space-around;
  // background-color: #000;
  padding-bottom: -2px;
}
</style>
