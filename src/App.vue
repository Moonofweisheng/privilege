<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>-->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    if (sessionStorage.getItem("ip")) {
      this.$store.commit("login/updateIp", sessionStorage.getItem("ip"));
    }
  }
};
</script>
<style lang="less" >
@import "./util/css/layout/layout";
#app {
  min-height: 100%;
}
</style>

