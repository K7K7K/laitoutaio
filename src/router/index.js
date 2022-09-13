import Vue from "vue";
import VueRouter from "vue-router";
import myLog from "../views/myLog.vue";
import myreg from "../views/myreg.vue";
import myIndex from "../views/Index/myIndex.vue";
import tomyIndex from "../views/Index/tomyIndex.vue";
import fabu from "../views/Index/fabu.vue";
import wode from "../views/Vita/wode.vue";
import myvita from "../views/Vita/myvita.vue";
import collect from "../views/Vita/collect.vue";
import myfabu from "../views/Vita/myfabu.vue";
import historie from "../views/Vita/historie.vue";
import mypassword from "../views/Vita/mypassword.vue";
import forget from "../views/Vita/forget.vue";
import contactUs from "../views/Vita/contactUs.vue";
import AboutUs from "../views/Vita/AboutUs.vue";
import artdet from "../views/Index/artdet.vue";
import mysearch from "../views/Index/mysearch.vue";
import searchList from "../views/Index/searchList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: myLog,
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import("../views/myreg.vue"),
  },
  {
    path: "/",
    redirect: "/index",
  },

  {
    path: "/",
    name: "index",
    component: () => import("../views/Index/myIndex.vue"),

    children: [
      {
        path: "/index",
        component: () => import("../views/Index/tomyIndex.vue"),
        // component: tomyIndex
        meta: {
          keep: true,
        },
      },
      {
        path: "/fabu",
        component: () => import("../views/Index/fabu.vue"),
        // component: tomyIndex
        meta: {
          keep: true,
        },
      },
      {
        path: "/wode",
        component: () => import("../views/Vita/wode.vue"),
        // component: tomyIndex
        meta: {
          keep: true,
        },
      },
    ],
  },
  {
    path: "/myvita",
    name: "myvita",
    component: () => import("../views/Vita/myvita.vue"),
  },
  {
    path: "/mypassword",
    name: "mypassword",
    component: () => import("../views/Vita/mypassword.vue"),
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("../views/Vita/forget.vue"),
  },
  {
    path: "/collect",
    name: "collect",
    component: () => import("../views/Vita/collect.vue"),
  },
  {
    path: "/myfabu",
    name: "myfabu",
    component: () => import("../views/Vita/myfabu.vue"),
  },
  {
    path: "/historie",
    name: "historie",
    component: () => import("../views/Vita/historie.vue"),
  },
  {
    path: "/contactUs",
    name: "contactUs",
    component: () => import("../views/Vita/contactUs.vue"),
  },
  {
    path: "/AboutUs",
    name: "AboutUs",
    component: () => import("../views/Vita/AboutUs.vue"),
  },

  {
    path: "/artdet",
    name: "artdet",
    component: () => import("../views/Index/artdet.vue"),
  },
  {
    path: "/mysearch",
    name: "mysearch",
    component: () => import("../views/Index/mysearch.vue"),
  },
  {
    path: "/searchList",
    name: "searchList",
    component: () => import("../views/Index/searchList.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
