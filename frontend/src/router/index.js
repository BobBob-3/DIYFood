import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    path: '/recipe',
    name: 'Recipe',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/2_recipe/RecipeView.vue'
      )
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
