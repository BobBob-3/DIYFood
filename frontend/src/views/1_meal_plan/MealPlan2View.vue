<template>
<body id="page">
  <div>
    <!-- Head -->
    <div style="margin-top: 30px; " id="head">
      <span style="margin-left: 100px; font-size:4em; font-weight:500;">
        MEAL PLAN
      </span>
      <span style="margin-left: 20px; font-size:1.5em; font-weight:400;">
        설정된 예산에 맞춰 건강하고 신선한 식단을 추천합니다.
      </span>
    </div>
    <!-- Side -->
    <aside id="side">
      <div style="text-align: center;">
        <img src="@/assets/harvest.png" alt="식단계획2" height="200" width="200" >
      </div>
      <div style="margin-top: 30px; text-align: center;">
        <h3>2. 재료 선택</h3>
      </div>
    </aside>
    <!-- Content -->
    <section id="content">
      <div id="next" style="text-align:center;" >
        <input type="button" class="next-button" value="NEXT" onClick="location.href='/mealplan/step2'">
      </div>
    </section>
    {{ numberOfMeals }}
  </div>
</body>

</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
</style>
