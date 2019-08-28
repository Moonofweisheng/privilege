<template>
  <div class="main">
    <div class="main-head">
      <img src="../assets/PaySuccess/pay1.jpg" />
    </div>
    <!-- <img id="barcode" /> -->
    <div class="main-mid">
      <div class="main-mid-item">
        <img class="main-mid-item-mongolia" src="../assets/PaySuccess/mongolia.png" />
        <div class="main-mid-item-left">
          <img src="../assets/PaySuccess/coupon1.png" />
        </div>
        <div class="main-mid-item-right">
          <span style="font-size:4.5vw">罗莱&内野 TW378</span>
          <span style="font-size:3.4vw">越南进口云朵方面浴套装兑换券</span>
          <span style="font-size:4vw">兑换码：9888882234448</span>
          <img id="code1" />
        </div>
      </div>
      <div class="main-mid-item" style="margin-top:5vw">
        <img class="main-mid-item-mongolia" src="../assets/PaySuccess/mongolia.png" />
        <div class="main-mid-item-left">
          <img src="../assets/PaySuccess/coupon2.png" />
        </div>
        <div class="main-mid-item-right">
          <span style="font-size:4.5vw;">99元现金抵用券</span>
          <span style="font-size:4vw">兑换码：9888882234448</span>
          <img id="code2" height="10vw" />
        </div>
      </div>
    </div>
    <div class="main-foot">
      <span>请截图保存兑换码</span>
      <van-button @click="back()" type="primary" color="#03a9a5">返回首页</van-button>
    </div>
  </div>
</template>
<script>
import JsBarcode from "jsbarcode";
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
  mounted() {
    JsBarcode("#code1", "2222232342323423", {
      format: "CODE128", //选择要使用的条形码类型
      displayValue: false //是否在条形码下方显示文字
    });
    JsBarcode("#code2", "2222232342323423", {
      format: "CODE128", //选择要使用的条形码类型
      displayValue: false //是否在条形码下方显示文字
    });
  },
  methods: {
    back() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../util/css/ModifyVantStyle/Button";
.main {
  min-height: 100vh;
  width: 100vw;
  height: auto;
  background-color: #851b29;
  &-head {
    img {
      width: 100%;
      height: auto;
    }
  }
  &-mid {
    &-item {
      position: relative;
      width: 90vw;
      height: 36vw;
      margin: 0 auto;
      border-left: 1px solid #d68b97;
      border-top: 1px solid #d68b97;
      border-bottom: #6c1621;
      border-right: #6c1621;
      border-radius: 3vw;
      box-shadow: #6c1621 1.4vw 1.4vw;
      .flex(row, center);
      &-mongolia {
        position: absolute;
        border-radius: 3vw;
        left: 0;
        top: 0;
        width: 65%;
        height: 100%;
      }
      &-left {
        width: 44%;
        height: 100%;
        .flex(column, center);
        img {
          width: 80%;
          margin-left: 10%;
          height: auto;
        }
      }
      &-right {
        flex: 1;
        height: 100%;
        text-align: center;
        .flex(column, space-around);
        img {
          width: 70%;
          height: 13vw;
          margin-left: 15%;
        }
        span {
          color: #ffffff;
          display: block;
          width: 100%;
        }
      }
    }
  }
  &-foot {
    padding: 5vw 0;
    text-align: center;
    span {
      color: #ffffff;
      font-size: 4vw;
      display: block;
      margin-bottom: 5vw;
    }
  }
}
</style>