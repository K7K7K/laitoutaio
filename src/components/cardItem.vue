<template>
    <li
      ref="cardBox"
      class="itemwrap"
      :key="item._id"
      @click="toindex(item)"
      :style="{
        height : height ? height + 'px' : 'auto'
      }"
    >
      <div :class="isShow ? '' : 'noneShow'">
        <h3 class="max-p">{{ item.title }}</h3>
        <div v-if="item.imageSrc.length" class="pc1fu">
          <img :class="['topc1', `imgcount${item.imageSrc.length}`]" alt="" v-for="(img, i) in item.imageSrc" v-lazy="img" :key="i" />
        </div>
        <div class="getBottom_v">
          <span class="max-p">{{ item.author }}</span>
          <span>{{ item.comment }}评论</span>
        </div>
      </div>
    </li>
</template>

<script>

export default {
  props: {
    item: {type: [Object]},
  },
  data() {
    return {
      isShow: true,
      height: 0,
      visible: false,
      io: window.IntersectionObserver && new IntersectionObserver(entries => {
        // console.log('aaa', entries[0].target, entries[0].isIntersecting)
        if (entries[0].isIntersecting) {
          this.isShow = true
          this.height = 0
          if (this.visible) return
          this.visible = true
        } else {
          if (!this.visible) return
          if (!this.$refs.cardBox.offsetHeight) return
          this.height = this.$refs.cardBox.offsetHeight
          this.isShow = false
        }
      }),
    };
  },

  mounted() {
    this.io && this.io.observe(this.$refs.cardBox)
  },
  beforeDestroy () {
    this.io && this.io.disconnect()
  },
  methods: {
    //跳文章详情
    toindex(item) {
      this.$router.push({
        name: "artdet",
        query: {
          article_id: item._id,
          user_id: item.author_id2,
        },
      });
    },
    },

};
</script>

<style lang="less" scoped>
.itemwrap {
  list-style: none;
  margin-bottom: 10px;
  background-color: #fff;
  margin: 15px 10px 10px 10px;
  overflow: hidden;
  .noneShow{
    display: none;
  }
  .max-p {
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
  }
  .pc1fu {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .getBottom_v {
    margin: 7px 0;
  }
  .imgcount1{
    width: 100%;
  }
  .imgcount2{
    width: 40%;
  }
  .imgcount3{
    width: 30%;
  }
}
</style>
