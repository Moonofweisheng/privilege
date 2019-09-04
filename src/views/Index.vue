<template>
  <div class="main">
    <div class="main-head"></div>
    <div class="myPrize" @click="getOrder()">我的奖品</div>
    <img src="../assets/Index/gift.png" class="gift" />
    <div class="main-mid">
      <img src="../assets/Index/main1.png" />
      <img
        @click="privilegeShow()"
        style="display:block;width:40%;margin:0 auto;cursor:pointer"
        src="../assets/Index/detail.png"
      />
      <img
        @click="pay()"
        style="display:block;width:50%;margin:1vw auto"
        src="../assets/Index/pay.png"
      />
      <img src="../assets/Index/main-help.png" />
    </div>
    <div class="main-foot"></div>
    <img src="../assets/Index/huabian.png" class="huabian" />

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

    <!-- 特权介绍开始 -->
    <transition name="bounce">
      <div class="toast" v-if="showPrivilege">
        <img class="closeBtn" src="../assets/Index/col/close.png" @click="privilegeClose()" />
        <van-row gutter="20">
          <van-col span="12" class="img-left">
            <img src="../assets/Index/col/1.png" />
          </van-col>
          <van-col span="12" class="img-right">
            <img src="../assets/Index/col/2.png" />
          </van-col>
          <van-col span="12" class="img-left">
            <img src="../assets/Index/col/3.png" />
          </van-col>
          <van-col span="12" class="img-right">
            <img src="../assets/Index/col/4.png" />
          </van-col>
          <van-col span="12" class="img-left">
            <img src="../assets/Index/col/5.png" />
          </van-col>
          <van-col span="12" class="img-right">
            <img src="../assets/Index/col/6.png" />
          </van-col>
          <van-col span="12" class="img-left">
            <img src="../assets/Index/col/7.png" />
          </van-col>
          <van-col span="12" class="img-right">
            <img src="../assets/Index/col/8.png" />
          </van-col>
          <van-col span="12" class="img-left">
            <img src="../assets/Index/col/9.png" />
          </van-col>
          <van-col span="12" class="img-right">
            <img src="../assets/Index/col/10.png" />
          </van-col>
        </van-row>
      </div>
    </transition>
    <!-- 特权介绍开始 -->
  </div>
</template>
<script>
import { Button, Toast, Row, Col } from "vant";
import { mobileCheck } from "../util/js/check";
import { getCode } from "../util/js/getParam";
import { getOsVersion } from "../util/js/device";
import { rollBug } from "../util/js/iosRollBug";
import { getWxCallbackParams } from "../util/js/jsApi";
import wx from "weixin-js-sdk";
export default {
  name: "Index",
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data() {
    return {
      showMsgCode: false, //是否显示验证码toast
      showPrivilege: false, //显示特权
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
    this.mobile = this.$store.state.login.mobile;
    this.msg = this.$store.state.login.msg;
    this.clickFlag = this.$store.state.clickAble.clickFlag;
    this.errMsg = this.$store.state.clickAble.clickMsg;
    let parm = getCode(location.search);
    getWxCallbackParams(
      window.location.href,
      getOsVersion(),
      this.$store.state.login.ip,
      parm.userCode
    );
    if (!this.$store.state.login.islogin) {
      this.$store.commit("login/updateUserCode", parm.userCode);
      Toast.loading({
        mask: true,
        duration: 0,
        forbidClick: true,
        message: "努力授权中..."
      });
      this.$api
        .wxAuthLogin(parm.code, parm.userCode, getOsVersion())
        .then(result => {
          if (result.data.errcode == "0") {
            let login = {
              os: getOsVersion(),
              token: result.data.token,
              openid: result.data.openid,
              shopCode: result.data.shopCode,
              islogin: true
            };
            this.$store.commit("login/login", login);
            if (result.data.purchased == "1") {
              this.errMsg = result.data.errmsg;
              this.clickFlag = false;
            }
          } else {
            alert(result.data.errmsg);
            this.errMsg = result.data.errmsg;
            this.clickFlag = false;
          }
          Toast.clear();
          let click = {
            clickFlag: this.clickFlag,
            clickMsg: this.errMsg
          };
          this.$store.commit("clickAble/updateClick", click);
        })
        .catch(error => {
          Toast.clear();
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
    //特权列表显示按钮
    privilegeShow() {
      this.showPrivilege = true;
    },
    //特权列表关闭按钮
    privilegeClose() {
      this.showPrivilege = false;
    },
    //我的订单按钮事件
    getOrder() {
      this.$router.push("/paySuccess");
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
            this.clickFlag = false;
            this.errMsg = "您已经购买过！";
            let click = {
              clickFlag: false,
              clickMsg: "您已经购买过！"
            };

            this.$store.commit("clickAble/updateClick", click);
            Toast.loading({
              mask: true,
              duration: 0,
              forbidClick: true,
              message: "加载中..."
            });
            let timer = setInterval(() => {
              this.$api
                .orderList()
                .then(result => {
                  if (
                    result.data.errcode == "0" &&
                    result.data.orderList.length == "1"
                  ) {
                    Toast.clear();
                    this.$router.push("/paySuccess");
                  }
                })
                .catch(err => {
                  Toast.clear();
                });
            }, 1000);
            this.$once("hook:beforeDestroy", () => {
              clearInterval(timer);
            });
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
        } else if (result.data.errcode == "1") {
          alert(result.data.errmsg);
          return;
        } else if (result.data.errcode == "2") {
          let mobileObj = {
            mobile: this.mobile,
            msg: this.msg
          };
          this.$store.commit("login/updateMobile", mobileObj);
          this.$router.push("/login");
        } else {
          alert("未知错误");
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
@main-bgcolor: #98181f;
.main {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  position: relative;
  background-color: @main-bgcolor;
  background-image: url("../assets/Index/bg.png");
  background-size: 100vw auto;
  background-repeat: no-repeat;
  &-head {
    height: 70vw;
  }
  &-mid {
    width: 80vw;
    height: 110vw;
    border-radius: 3vw;
    margin: 0 auto;
    overflow: hidden;
    background: rgba(130, 0, 0, 0.6);
    border: 1px solid #ffb400;
    img {
      width: 100%;
      height: auto;
    }
  }
  &-foot {
    height: 15vw;
  }
  .mid-span {
    font-size: 3vw;
    margin: 0 auto;
    margin-top: 2vw;
    width: 66vw;
    color: #ffffff;
    text-align: center;
  }
  .toast {
    overflow-y: scroll;
    background-color: rgba(0, 0, 0, 0.7);
    .toastFoot {
      img {
        width: 100%;
        height: auto;
      }
    }

    .img-left {
      text-align: right;
    }
    .img-right {
      text-align: left;
    }
    img {
      width: 70%;
      height: auto;
    }
    .closeBtn {
      position: absolute;
      top: 5vw;
      right: 5vw;
      width: 6vw;
      height: auto;
    }
  }
  .myPrize {
    position: fixed;
    z-index: 20;
    top: 15vw;
    right: 0vw;
    width: 20vw;
    height: 8vw;
    border-radius: 90px 0 0 90px;
    text-align: center;
    line-height: 8vw;
    color: white;
    font-size: 3.7vw;
    background: #62aba2;
  }
  .gift {
    position: absolute;
    z-index: 20;
    top: 50vw;
    left: 5vw;
    width: 30vw;
    height: auto;
  }
  .huabian {
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100vw;
    height: auto;
  }
}
</style>