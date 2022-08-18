<template>
  <body id="page" style="text-align: center;">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MEAL PLAN
      </p>
      <p style="font-size:1.5em; font-weight:400;">
        설정된 예산에 맞춰 건강하고 신선한 식단을 추천합니다.
      </p>
    </div>
    <div style="display: inline-block;">
      <section id="content-box" style="margin-left:50px">
        <img src="@/assets/check-list.png" alt="" class="img_style">
        <div style="margin-top:30px;">
          <p>기간, 재료, 예산을</p>
          <p style="line-height:2px">설정하고</p>
        </div>
      </section>
      <section id="content-box">
        <img src="@/assets/recipe-book.png" alt="" class="img_style">
        <div style="margin-top:30px;" >
          <p>선호하는 레시피를</p>
          <p style="line-height:2px">직접 선택해서</p>

        </div>
      </section>
      <section id="content-box">
        <img src="@/assets/calendar.png" alt="" class="img_style">
        <div style="margin-top:30px;">
          <p>식단 계획을</p>
          <p style="line-height:2px">완성합니다.</p>
        </div>
      </section>
      <div id="next" style="text-align:center;" >
      <a href="/mealplan/step1">
        <input type="button" class="next-button" value="START!">
      </a>
      </div>
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
body{background: #f3f3f3;}
#content-box{
  float: left;
  width: 200px;
  height: 300px;
  background-color:white;
  margin-right: 50px;
  margin-top: 10px;
  margin-bottom: 0px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding-top: 30px;
  padding-bottom: 10px;
}
.img_style {
  height: 150px;
  width: 150px;
  text-align: center;
}
.next-button {
  background-color: white;
  height: 50px;
  width: 150px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px lightgray;
  margin-top: 30px;
  border: none;
}
</style>
