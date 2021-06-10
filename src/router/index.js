import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import RecipesIndex from "../views/recipes/Index.vue";
import RecipesNew from "../views/recipes/New.vue";
import RecipesShow from "../views/recipes/Show.vue";
import RecipesEdit from "../views/recipes/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/recipes",
    name: "recipes-index",
    component: RecipesIndex
  },
  {
    path: "/recipes/new",
    name: "recipes-new",
    component: RecipesNew
  },
  {
    path: "/recipes/:id",
    name: "recipes-show",
    component: RecipesShow
  },
  {
    path: "/recipes/:id/edit",
    name: "recipes-edit",
    component: RecipesEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
