<template>
  <div class="main">
    <div class="main-mid">
      <img src="../assets/PaySuccess/paybg.png" />
      <div style="position:absolute; top: 30vh;left: 20vw;">
        <div class="main-mid-coupon">
          <div class="round" id="left"></div>
          <div class="round" id="right"></div>
          <span style="font-size: 4vw; display: block;">99元特权卡兑换券</span>
          <span style="font-size: 4vw; display: block;">{{code}}</span>
        </div>
        <div class="main-mid-add">
          <span style=" display: block;width:55vw">活动门店：{{shopName}}</span>
          <span style=" display: block;width:55vw">地址：{{shopAddress}}</span>
          <span style=" display: block;width:55vw">联系方式：{{shopTel}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "PaySuccess",
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      code: "暂无信息", //券号
      shopAddress: "暂无信息", //门店地址
      shopName: "暂无信息", //门店名称
      shopTel: "暂无信息" //门店联系方式
    };
  },
  created() {
    Toast.loading({
      mask: true,
      duration: 0,
      forbidClick: true,
      message: "加载中..."
    });
    this.$api
      .orderList()
      .then(result => {
        Toast.clear();
        if (result.data.errcode == "0") {
          [this.code, this.shopAddress, this.shopName, this.shopTel] = [
            result.data.orderList[0].ticketCode,
            result.data.orderList[0].shopAddress,
            result.data.orderList[0].shopName,
            result.data.orderList[0].shopTel
          ];
          console.log(result.data);
        }
      })
      .catch(err => {
        Toast.clear();
      });
  },
  computed: {},
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
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
      position: relative;
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
      position: relative;
      width: 60vw;
      margin-top: 5vw;
      overflow: hidden;
      font-size: 4vw;
    }
  }
}
</style>