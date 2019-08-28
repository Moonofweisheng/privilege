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
        title: "罗莱婚博会"
      }
    },
    {
      path: '/jump/:shopCode',
      name: 'jump',
      component: () => import('../views/Jump.vue'),
      meta: {
        title: "罗莱婚博会"
      }
    },
    {
      path: "/paySuccess",
      name: "paySuccess",
      component: () =>
        import("../views/PaySuccess.vue"),
      meta: {
        title: "罗莱婚博会"
      }
    }, {
      path: "/myOrder",
      name: "myOrder",
      component: () =>
        import("../views/MyOrder.vue"),
      meta: {
        title: "罗莱婚博会"
      }
    }, {
      path: "/shopList",
      name: "shopList",
      component: () =>
        import("../views/ShopList.vue"),
      meta: {
        title: "罗莱婚博会"
      }
    }
  ]
});

