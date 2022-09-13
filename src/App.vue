<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

body {
  background-color: #f5f7f9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
//忘记密码
.forget {
  font-size: 16px;
  margin: 10px 10px;
  color: blue;
  // float: left;
}
//
.log {
  width: 90%;
  height: 40px;
  margin: 20px auto;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  background-color: #2fc6ca;
}
//input输入框
.fabu_input {
  // max-width: 200px;
  width: 100%;
  height: 50px;
  border: none;
  line-height: 50px;
  margin: 5px 0;
}
// 导航
.misc {
  width: 100%;
  height: 50px;
  background-color: #2fc6ca;
  text-align: center;
  color: #fff;
  font-size: 20px;
  line-height: 50px;
}
</style>
