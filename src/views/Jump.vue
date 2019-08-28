<template>
  <div></div>
</template>
<script>
export default {
  name: "Jump",
  created() {
    let shopCode = this.$route.params.shopCode;
    let toUrl =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx54668a1c5f97777d&redirect_uri=http://static.luolai.cn/activity/wedding/&response_type=code&scope=snsapi_userinfo&state=" +
      shopCode +
      "#wechat_redirect";
    window.location.href = toUrl;
  }
};
</script>
