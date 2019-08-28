<template>
  <div class="main">
    <div class="main-head">
      <img src="../assets/Index/home1.jpg" alt />
    </div>
    <div class="main-mid">
      <van-button type="primary" color="#ff004a" size="large" @click="pay()">立即支付</van-button>
      <div class="main-mid-btnGroup">
        <van-button type="primary" color="#03a9a5" @click="getShop()">参与门店</van-button>
        <van-button @click="getOrder()" type="primary" color="#03a9a5">我的订单</van-button>
      </div>
    </div>
    <div class="main-foot">
      <img src="../assets/Index/home2.jpg" />
      <img src="../assets/Index/pic1.jpg" />
      <img src="../assets/Index/pic2.jpg" />
      <img src="../assets/Index/pic3.jpg" />
      <img src="../assets/Index/pic4.jpg" />
      <img src="../assets/Index/pic5.jpg" />
      <img src="../assets/Index/logo.jpg" />
    </div>

    <!-- 登录开始 -->
    <transition name="bounce">
      <div class="toast" v-if="showMsgCode">
        <header class="toastHead">
          <img src="../assets/msgToast/header.png" class="headImg" />
          <img src="../assets/msgToast/close.png" class="closeBtn" @click="close()" />
        </header>
        <main class="toastMid">
          <input
            type="text"
            v-model="mobile"
            class="midInp"
            placeholder="请输入手机号码"
            @blur="rollDebug()"
          />
          <input
            type="text"
            v-model="msg"
            class="midInp code"
            placeholder="请输入验证码"
            @blur=" rollDebug()"
          />
          <button
            class="codeBtn"
            :disabled="showCode"
            :class="{ 'msg-btn--disabled': showCode,'msg-btn--abled':!showCode }"
            @click="sendMsg()"
          >{{textMsg}}</button>
          <img src="../assets/msgToast/btn2.png" class="toastBtn" @click="msgPay()" />
          <div class="mid-span">支付成功后，请务必将卡券添加至[微信卡包]</div>
        </main>
        <footer class="toastFoot">
          <img src="../assets/msgToast/headBottom.png" />
        </footer>
      </div>
    </transition>
    <!-- 登录结束 -->
  </div>
</template>
<script>
import { Button, Toast } from "vant";
import { mobileCheck } from "../util/js/check";
import { getCode } from "../util/js/getParam";
import { getOsVersion } from "../util/js/device";
import { rollBug } from "../util/js/iosRollBug";
import { mapState } from "vuex";
import wx from "weixin-js-sdk";
export default {
  name: "Index",
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      showMsgCode: true, //是否显示验证码toast
      mobile: "", //手机号
      msg: "", //验证码
      time: 60, //验证码倒计时
      clickFlag: true, //按钮是否可以点击
      showCode: true, //验证码按钮是是否可以点击 false可以点击
      textMsg: "发送", //验证码按钮显示的文本
      errMsg: "" //按钮禁止点击的文本
    };
  },
  created() {
    this.clickFlag = this.$store.state.clickAble.clickFlag;
    this.errMsg = this.$store.state.clickAble.clickMsg;
    let parm = getCode(location.search);
    if (!this.$store.state.login.islogin) {
      this.$store.commit("login/updateShopCode", parm.shopCode);
      Toast.loading({
        mask: true,
        duration: 0,
        forbidClick: true,
        message: "努力授权中..."
      });
      this.$api
        .wxAuthLogin(parm.code, parm.shopCode, getOsVersion())
        .then(result => {
          if (result.data.errcode == "0") {
            let login = {
              os: getOsVersion(),
              token: result.data.token,
              openid: result.data.openid,
              islogin: true
            };
            this.$store.commit("login/login", login);
            if (result.data.purchased == "1") {
              this.errMsg = result.data.errmsg;
              this.clickFlag = false;
            }
            Toast.clear();
          } else {
            alert(result.data.errmsg);
            this.errMsg = result.data.errmsg;
            this.clickFlag = false;
            Toast.clear();
          }
          let click = {
            clickFlag: this.clickFlag,
            clickMsg: this.errMsg
          };
          this.$store.commit("clickAble/updateShopCode", click);
        });
    }
  },
  computed: {},
  methods: {
    //解决微信输入框bug
    rollDebug() {
      rollBug();
    },
    //验证码关闭按钮
    close() {
      this.showMsgCode = false;
    },
    //我的订单按钮事件
    getOrder() {
      this.$router.push("/myOrder");
    },
    //获取参与的门店按钮事件
    getShop() {
      this.$router.push("/shopList");
    },
    //验证码发送按钮事件
    sendMsg() {
      if (!this.clickFlag) {
        alert(this.errMsg);
        return;
      }
      if (!mobileCheck(this.mobile.trim())) {
        alert("请输入正确的手机号");
        return;
      }
      this.timeOut();
      this.$api
        .sendMsgcode(this.mobile.trim())
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //验证码倒计时
    timeOut() {
      if (this.time == 0) {
        this.textMsg = "重新发送";
        if (mobileCheck(this.mobile)) {
          this.showCode = false;
        }
        this.time = 60;
        return;
      }
      this.showCode = true;
      this.textMsg = `已发送(${this.time})`;
      this.time--;
      setTimeout(this.timeOut, 1000);
    },
    onBridgeReady(appId, timeStamp, nonceStr, packages, signType, sign) {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: appId, //公众号名称，由商户传入
          timeStamp: timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: nonceStr, //随机串
          package: packages,
          signType: signType, //微信签名方式：
          paySign: sign //微信签名
        },
        res => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            this.clickFlag = false;
            this.errMsg = "您已经购买过！";
            let click = {
              clickFlag: false,
              clickMsg: "您已经购买过！"
            };
            this.$store.commit("clickAble/updateShopCode", click);
          }
        }
      );
    },
    //支付按钮
    pay() {
      if (!this.clickFlag) {
        alert(this.errMsg);
        return;
      }
      if (this.$store.state.login.islogin) {
        this.showMsgCode = true;
      } else {
        alert("未获取到授权，请退出后重新登录");
        return;
      }
    },
    msgPay() {
      if (!mobileCheck(this.mobile.trim())) {
        alert("请输入正确的手机号");
        return;
      } else if (this.msg == "") {
        alert("请输入验证码");
        return;
      }
      this.showMsgCode = false;
      Toast.loading({
        mask: true,
        duration: 0,
        forbidClick: true,
        message: "请稍后..."
      });
      this.$api.doPay(this.mobile, this.msg).then(result => {
        console.log(result);
        Toast.clear();
        if (result.data.errcode == "0") {
          let appId = result.data.appId;
          let timeStamp = result.data.timeStamp;
          let nonceStr = result.data.nonceStr;
          let packages = result.data.package;
          let signType = result.data.signType;
          let sign = result.data.sign;
          this.onBridgeReady(
            appId,
            timeStamp,
            nonceStr,
            packages,
            signType,
            sign
          );
        } else {
          alert(result.data.errmsg);
          return;
        }
      });
    }
  },
  watch: {
    mobile: function() {
      if (this.time == "60") {
        if (mobileCheck(this.mobile)) {
          this.showCode = false;
        } else {
          this.showCode = true;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../util/css/ModifyVantStyle/Button";
@import "../util/css/toast/toast";
@main-bgcolor: #851b29;
.main {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  background-color: @main-bgcolor;
  &-head {
    img {
      width: 100%;
      height: auto;
    }
  }
  &-mid {
    width: 80vw;
    margin: 0 auto;
    padding: 4vw 0;
    &-btnGroup {
      margin-top: 7vw;
      .flex(row, space-between);
    }
  }
  &-foot {
    img {
      width: 100%;
      height: auto;
    }
  }
  .mid-span {
    font-size: 3vw;
    margin: 0 auto;
    margin-top: 2vw;
    width: 66vw;
    color: #ffffff;
    text-align: center;
  }
}
</style>