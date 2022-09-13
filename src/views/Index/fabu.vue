<template>
  <div>
    <van-nav-bar title="发布" class="v-nav" />
    <van-form @submit="onSubmit">
      <!-- <input class="fabu_input" type="text" placeholder="请输入标题" v-model="hh" /> -->

      <van-cell-group>
        <van-field v-model="hh" label="标题" placeholder="请输入标题" />
      </van-cell-group>

      <van-field
        v-model="message"
        rows="3"
        autosize
        label="请输入内容"
        type="textarea"
        maxlength="100"
        placeholder=""
        show-word-limit
        class="conter"
      />

      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="类型选择"
        placeholder="点击选择类型"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="top">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>

      <!-- 发布的图片 -->
      <van-field label="图片" label-width="30px">
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="3" class="v-up" />
        </template>
      </van-field>
    </van-form>
    <div class="log" @click="getfabu">
      <span>确定</span>
    </div>
  </div>
</template>
<script>
import { NavBar, Field, Uploader, Picker, Form, Popup, Toast, Cell, CellGroup } from "vant";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      value: "",
      columns: [],
      showPicker: false,
      message: "",
      fileList: [],
      hh: "",
      author: "",
      author_id: "",
      list: [],
      cate_id: "",
      imageSrc: [],
      uid: localStorage.getItem("uid"),
    };
  },
  methods: {
    ...mapActions(["upload"]),
    // ...mapState(["uid"]),
    onConfirm(value, index) {
      this.value = value;
      this.showPicker = false;
      this.cate_id = this.list[index]._id;
    },
    //上传图片

    //发布
    async getfabu() {
      // console.log(this.uid);
      console.log(this.fileList);
      let imageSrc = await this.upload(this.fileList);
      console.log(imageSrc);

      if (this.uid == "") {
        this.$Toast("请先登录");
        setTimeout(() => {
          this.$router.push("/");
        }, 500);
        return;
      }

      this.axios
        .post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/add_article", {
          title: this.hh,
          content: this.message,
          author_id: localStorage.getItem("uid"),
          cate_name: this.value,
          cate_id: this.cate_id,
          author: this.author,
          imageSrc,
        })
        .then((res) => {
          if (res.data.code == "0") {
            console.log(res);
            Toast.success("发布成功");
            (this.value = ""), (this.hh = ""), (this.fileList = []);
            this.message = "";
          } else {
            Toast.fail(res.data.msg);
            console.log(res);
          }
        })
        .catch((err) => {});
    },

    onSubmit(values) {
      // let imageSrc = await this.upload(fileList);
      // console.log( this.fileList);
      console.log(values);
      // alert("22");
    },
  },
  mounted() {
    //获取分类
    this.axios
      .post("https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/api/get_cate_list")
      .then((res) => {
        console.log(res);
        this.list = res.data.data;
        console.log(this.list);
        this.list.forEach((v) => {
          this.columns.push(v.name);
        });
      })
      .catch((err) => {});
  },
};
</script>

<style lang="less">
.v-nav {
  background-color: #2fc6ca;
  color: #fff;
}

.v-hn {
  margin: 15px 0;
}

.v-up {
  margin: 15px 0;
}
.v-navs {
  width: 85%;
  color: #fff;
  margin: 0 auto;
}
.fabu_input {
  // max-width: 200px;
  width: 100%;
  height: 50px;
  border: none;
  line-height: 50px;
  margin: 5px 0;
}
.log {
  background-color: #2fc6ca;
}
</style>
