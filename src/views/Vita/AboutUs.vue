<template>
  <div>
    <div class="misc">
      <van-nav-bar title="关于我们" class="bar" left-text="" left-arrow @click-left="onClickLeft" />
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
