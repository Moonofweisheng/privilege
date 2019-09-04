<template>
  <div class="main">
    <div class="head">
      <span>注册/绑定会员</span>
    </div>
    <div class="mid">
      <van-field v-model="mobile" clearable label="手机号" placeholder="请输入手机号" />
      <van-field v-model="msg" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button
          class="mid-btn"
          slot="button"
          size="small"
          type="primary"
          @click="sendMsg()"
          color="#cc9966"
          :disabled="showCode"
          :class="{ 'mid-btn--disabled': showCode,'mid-btn--abled':!showCode }"
        >{{textMsg}}</van-button>
      </van-field>
    </div>
    <div class="foot">
      <van-button
        type="primary"
        size="large"
        @click="nextStep()"
        :loading="nextBtnLoading"
        loading-text="加载中..."
        color="#cc9966"
      >下一步</van-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Field, Button, Toast } from "vant";
import { mobileCheck } from "../util/js/check";
import { getCode } from "../util/js/getParam";
import { getOsVersion } from "../util/js/device";
import { mapState } from "vuex";
export default {
  name: "Main",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      mobile: "", //手机号
      msg: "", //验证码
      time: 60, //验证码倒计时
      showCode: true, //验证码按钮是是否可以点击 false可以点击
      textMsg: "发送", //验证码按钮显示的文本
      clickFlag: true, //按钮是否可以点击
      errMsg: "暂时无法参与", //错误信息
      nextBtnLoading: false //下一步按钮是否加载状态
    };
  },
  computed: {},
  created() {
    this.msg = this.$store.state.login.msg;
    this.mobile = this.$store.state.login.mobile;
  },
  methods: {
    //下一步
    nextStep() {
      if (!this.clickFlag) {
        alert(this.errMsg);
        return;
      }
      if (!mobileCheck(this.mobile.trim())) {
        alert("请输入正确的手机号");
        return;
      } else if (this.msg == "") {
        alert("请输入验证码");
        return;
      }
      let mobileObj = {
        mobile: this.mobile,
        msg: this.msg
      };
      this.$store.commit("login/updateMobile", mobileObj);
      this.nextBtnLoading = true;
      this.$router.push("/register");
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
@color: #cc9966;
@background: #aaaaaa;
.main {
  .head {
    width: 100vw;
    height: 40vw;
    font-size: 6vw;
    color: @color;
    text-align: center;
    .flex(column, center);
  }
  .mid {
    width: 100vw;
    margin: 0 auto;
    .mid-btn {
      width: 26vw;
    }
    .mid-btn--disabled {
      background-color: @background;
      border: 1px solid @background;
      color: white;
    }
    .mid-btn--abled {
      background-color: @color;
    }
  }
  .foot {
    width: 90vw;
    margin: 0 auto;
    margin-top: 17vw;
  }
}
@import "../util/css/ModifyVantStyle/Cell";
@import "../util/css/ModifyVantStyle/Button";
</style>

