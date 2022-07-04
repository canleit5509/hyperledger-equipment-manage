import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../view/Login.vue";
import MainPage from "../view/MainPage.vue";
import Campaign from "../view/Campaign";
import AccountManagement from "../view/AccountManagement";
import ErrorPage from "../view/ErrorPage.vue";
import Profile from "../view/Profile.vue";
import Dashboard from "../view/Dashboard.vue"
import MyDevices from "../view/MyDevices.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: MainPage,
    redirect: "/mydevices",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: "mydevices",
        path: "/mydevices",
        component: MyDevices,
      },
      {
        name: "campaign",
        path: "/campaign",
        component: Campaign,
      },
      {
        name: "accountmanagement",
        path: "/accountmanagement",
        component: AccountManagement,
        meta: {
          not_system_user: true
        }
      },
      {
        path: "/profile",
        name: 'profile',
        component: Profile
      },
    ]
  },
  { path: "/*", component: ErrorPage },

  {
    path: "*",
    redirect: "/404",
  },

];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem('user'))
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      if (to.matched.some((record) => record.meta.not_system_user)) {
        if (userInfo.role_id != 1 && to.matched.some((record) => record.name == 'accountmanagement')) {
          next('/404')
        }
      }
      next()
    }
    next();
  } else {
    if(!localStorage.getItem('token')) {
      next()
    } else {
      next('/')
    }
    next()
  }

});
export default router;