<template>
  <div>
    <div class="misc">
      <van-nav-bar title="联系我们" class="bar" left-text="" left-arrow @click-left="onClickLeft" />
    </div>
    <div style="text-align: center">
      <h2>联系我们</h2>
      <p>请填写信息:</p>
    </div>
    <div class="row">
      <div class="column">
        <form action="/wode">
          <label for="name">姓名</label>
          <input type="text" id="fname" name="name" placeholder="您的称呼.." />
          <label for="phone">联系电话</label>
          <input type="text" id="phone" name="phone" placeholder="联系电话.." />
          <label for="country">测试</label>
          <select id="country" name="country">
            <option value="bj">北京</option>
            <option value="sh">上海</option>
            <option value="sz">深圳</option>
          </select>
          <label for="subject">留言</label>
          <textarea id="subject" name="subject" placeholder="写入一些信息.." style="height: 170px"></textarea>
          <input type="submit" value="提交" @click="push_v" />
        </form>
      </div>
    </div>
    <div class="wrapper"></div>
  </div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.8&key=8f8a210c7d24d643bba8f1657a9afae7"></script>

<script>
// var map = new AMap.Map("wrapper");
window.onload = async function () {
  var map = await new AMap.Map("wrapper");
};
import { NavBar, Toast } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    push_v() {},
  },
};
</script>

<style lang="less">
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

/* Style inputs */
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

/* Style the container/contact section */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 10px;
}

/* Create two columns that float next to eachother */
.column {
  float: left;
  width: 50%;
  margin-top: 6px;
  padding: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* 响应式布局 */
@media screen and (max-width: 600px) {
  .column,
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
}
.wrapper {
  width: 100%;
  height: 500px;
}
</style>
