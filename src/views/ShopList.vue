<template>
  <div class="main">
    <div class="main-head">参与门店</div>
    <div class="main-mid">
      <div class="main-mid-item van-hairline--bottom" v-for="(item,index) in shopList" :key="index">
        <span>{{item.shopName}}</span>
        <span>{{item.shopAddress}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "ShopList",
  data() {
    return {
      shopList: []
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
      .getActivityShops()
      .then(result => {
        Toast.clear();
        if (result.data.errcode == "0") {
          this.shopList = [...result.data.shopList];
        }
      })
      .catch(error => {
        Toast.clear();
      });
  }
};
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  width: 100vw;
  height: auto;
  background-color: #851b29;
  &-head {
    height: 15vw;
    line-height: 15vw;
    font-size: 5vw;
    padding-left: 7vw;
    border-bottom: 1px solid #03a9a5;
    color: #03a9a5;
    margin-bottom: 5vw;
  }
  &-mid {
    padding-bottom: 8vw;
    &-item {
      width: 86vw;
      margin: 0 auto;
      padding-top: 3vw;
      padding-bottom: 4vw;
      color: #ffffff;
      :nth-child(1) {
        font-size: 4.5vw;
      }
      :nth-child(2) {
        margin-top: 1vw;
        font-size: 3.2vw;
      }
      span {
        display: block;
        white-space: nowrap; /*强制span不换行*/
        width: 100%; /*限制宽度 可设px*/
        overflow: hidden; /*超出宽度部分隐藏*/
        text-overflow: ellipsis; /*超出部分以点号代替*/
      }
    }
  }
}
</style>