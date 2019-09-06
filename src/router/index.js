import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: "/",
      name: "index",
      component: () =>
        import("../views/Index.vue"),
      meta: {
        title: "罗莱99元特权卡",
        keepAlive: true
      }
    },
    {
      path: '/jump/:userCode',
      name: 'jump',
      component: () => import('../views/Jump.vue'),
      meta: {
        title: "罗莱99元特权卡",
      }
    },
    {
      path: "/paySuccess",
      name: "paySuccess",
      component: () =>
        import("../views/PaySuccess.vue"),
      meta: {
        title: "支付成功",
        keepAlive: true

      }
    }, {
      path: "/myOrder",
      name: "myOrder",
      component: () =>
        import("../views/MyOrder.vue"),
      meta: {
        title: "我的订单"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../views/Login.vue'),
      meta: {
        title: "登录",
        keepAlive: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import('../views/Register.vue'),
      meta: {
        title: "完善个人信息",
        keepAlive: true

      }
    },
  ]
});

