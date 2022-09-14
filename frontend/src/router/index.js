import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mealplan',
    name: 'MealPlanMain',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/1_meal_plan/MealPlanMainView.vue'
      )
  },
  {
    path: '/mealplan/step1',
    name: 'MealPlanStep1',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/1_meal_plan/MealPlan1View.vue'
      )
  },
  {
    path: '/mealplan/step2',
    name: 'MealPlanStep2',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/1_meal_plan/MealPlan2View.vue'
      )
  },
  {
    path: '/mealplan/step3',
    name: 'MealPlanStep3',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/1_meal_plan/MealPlan3View.vue'
      )
  },
  {
    path: '/mealplan/step4',
    name: 'MealPlanStep4',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/1_meal_plan/MealPlan4View.vue'
      )
  },
  {
    path: '/mealplan/step5',
    name: 'MealPlanStep5',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/1_meal_plan/MealPlan5View.vue'
      )
  },
  {
    path: '/recipe',
    name: 'RecipeList',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/2_recipe/RecipeListView.vue'
      )
  },
  {
    path: '/recipe/foodname/:foodName',
    name: 'DetailRecipe_Name',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/2_recipe/DetailRecipeName.vue'
      )
  },
  {
    path: '/recipe/foodcode/:foodCode',
    name: 'DetailRecipe_Code',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/2_recipe/DetailRecipeCode.vue'
      )
  },
  {
    path: '/ingredient',
    name: 'IngredientPrice',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/3_ingredient_price/IngredientPriceView.vue'
      )
  },
  {
    path: '/analysis/survey',
    name: 'AnalysisSurvey',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/4_diet_analysis/AnalysisSurveyView.vue'
      )
  },
  {
    path: '/analysis/result',
    name: 'AnalysisResult',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/4_diet_analysis/AnalysisResultView.vue'
      )
  },
  {
    path: '/user/mypage',
    name: 'MyPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/MyPageView.vue'
      )
  },
  {
    path: '/user/mymealplan',
    name: 'MyMealPlan',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/MyMealPlanView.vue'
      )
  },
  {
    path: '/user/login',
    name: 'LogInPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/LogInView.vue'
      )
  },
  {
    path: '/user/signup',
    name: 'SignUpPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/SignUpView.vue'
      )
  },
  {
    path: '/user/signupcompleted',
    name: 'SignUpCompletedPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/SignUpCompletedView.vue'
      )
  },
  {
    path: '/user/info',
    name: 'MyInfoPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/MyInfoView.vue'
      )
  },
  {
    path: '/user/signout',
    name: 'SignOutPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/SignOutView.vue'
      )
  },
  {
    path: '/user/admin',
    name: 'AdminPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/5_mypage/AdminView.vue'
      )
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
