<template>
  <div class="main">
    <div class="main-mid">
      <img src="../assets/PaySuccess/paybg.png" />
      <div class="main-mid-coupon">
        <div class="round" id="left"></div>
        <div class="round" id="right"></div>
        <span style="font-size: 4vw; display: block;">乳胶枕兑换券码</span>
        <span style="font-size: 3.5vw; display: block;">(K3码111901200004000XX)</span>
        <span style="font-size: 3.5vw; display: block;">XXXXXXXXX</span>
      </div>
      <div class="main-mid-add">
        <span style=" display: block;width:55vw">活动门店：XXX罗莱家纺</span>
        <span style=" display: block;width:55vw">地址：XX省XX市XX区XX号</span>
        <span style=" display: block;width:55vw">联系方式：11111111111</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from "vant";
export default {
  name: "PaySuccess",
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      type: ""
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    back() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../util/css/ModifyVantStyle/Button";
@main-bgcolor: #98181f;
.main {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  background-color: @main-bgcolor;
  background-image: url("../assets/Index/bg.png");
  background-size: 100vw auto;
  background-repeat: no-repeat;
  &-mid {
    .flex(column, center);
    width: 100vw;
    min-height: 100vh;
    height: auto;
    background: rgba(130, 0, 0, 0.7);
    img {
      display: block;
      width: 80%;
      margin-left: 10%;
      height: auto;
    }
    &-coupon {
      position: absolute;
      top: 30vh;
      left: 20vw;
      width: 60vw;
      height: 20vw;
      border: 1px solid #98181f;
      border-radius: 2vw;
      background: #e2bd7b;
      text-align: center;
      color: #ac1717;
      .flex(column, space-around);
      .round {
        top: 7vw;
        position: absolute;
        height: 6vw;
        width: 3vw;
        background: #ddc193;
        border: 1px solid #98181f;
      }
      #left {
        left: -2px;
        border-left: 1px solid #ddc193;
        border-radius: 0vw 3vw 3vw 0vw;
      }
      #right {
        right: -2px;
        border-right: 1px solid #ddc193;
        border-radius: 3vw 0vw 0vw 3vw;
      }
    }
    &-add {
      color: #6d3612;
      position: absolute;
      left: 20vw;
      width: 60vw;
      overflow: hidden;
      font-size: 4vw;
    }
  }
}
</style>