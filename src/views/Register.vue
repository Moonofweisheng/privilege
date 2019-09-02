<template>
  <div class="main">
    <div class="head">
      <span class="head-title">完善个人资料</span>
    </div>
    <div class="mid">
      <van-field v-model="name" label="姓名" placeholder="请输入真实姓名" />
      <van-field v-model="birthday" label="生日" @click="birthClick()" placeholder="请选择生日" readonly />
      <van-cell title="性别">
        <label>
          <input v-model="gender" type="radio" name="gender" value="M" />男
        </label>
        <label>
          <input v-model="gender" type="radio" name="gender" value="F" />女
        </label>
      </van-cell>
    </div>
    <div class="foot">
      <van-button
        type="primary"
        size="large"
        @click="submit()"
        :loading="submitLoading"
        loading-text="提交中..."
      >提交</van-button>
    </div>
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :minDate="new Date(1900, 1, 1)"
        :maxDate="new Date()"
        type="date"
        @confirm="infoConfirm"
        @cancel="infocancel"
      />
    </van-popup>
  </div>
</template>
<script>
import { formatDate } from "../util/js/date";
import { Field, Button, Cell, DatetimePicker, Popup } from "vant";
export default {
  name: "Register",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  data() {
    return {
      dateShow: false, //日期选择组件显示flag
      currentDate: new Date(1985, 5, 1), //当前日期
      name: "", //姓名
      birthday: "", //生日
      gender: "M", //性别
      submitLoading: false //提交按钮是否加载状态
    };
  },
  created() {
    console.log(this.$store);
  },
  methods: {
    //生日输入框点击事件
    birthClick() {
      this.dateShow = true;
    },
    //生日确认
    infoConfirm(value) {
      this.dateShow = false;
      this.birthday = formatDate(value, "yyyy-MM-dd");
    },
    //生日取消
    infocancel() {
      this.dateShow = false;
    },
    submit() {
      if (this.name == "") {
        alert("请输入姓名");
        return;
      } else if (this.birthday == "") {
        alert("请选择生日");
        return;
      } else if (this.gender == "") {
        alert("请选择性别");
        return;
      }
      this.submitLoading = true;

      this.$api
        .addMember(
          this.name,
          this.$store.state.login.mobile,
          this.birthday,
          this.gender
        )
        .then(result => {
          console.log(result);
          this.submitLoading = false;
          if (result.data.errcode == "0") {
            this.$router.push("/success");
          } else if (result.data.errcode == "1") {
            alert(result.data.errmsg);
          } else {
            alert("未知错误");
          }
        })
        .catch(error => {
          this.submitLoading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
@color: #cc9966;
.main {
  .head {
    width: 100vw;
    height: 30vw;
    color: @color;
    text-align: center;
    .flex(column, center);
    &-title {
      font-size: 5vw;
    }
  }
  .mid {
    width: 90vw;
    margin: 0 auto;
    .van-cell__title {
      color: @color;
      width: 24vw;
      flex: none;
    }
    .van-cell__value {
      padding-right: 20vw;
      .flex(row, space-between);
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

