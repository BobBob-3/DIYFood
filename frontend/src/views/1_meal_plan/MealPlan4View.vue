<template>
  <body id="page">
    <div>
      <div>
        <!-- Side -->
        <div id="side">
          <div style="margin-top: 30px; " id="head">
            <h1>
              MEAL PLAN
            </h1>
          </div>
          <div style="text-align: center;">
            <img src="https://cdn-icons-png.flaticon.com/512/1889/1889972.png" alt="식단계획4" height="50%" width="50%">
          </div>
          <div style="margin-top: 30px; text-align: center;">
            <h3>4. 레시피 선택</h3>
          </div>
        </div>
      <!-- Content -->
      <section id="content">
        <div style="text-align:center;">
          <h1>레시피 선택</h1>
          <p>선택하신 재료를 가장 많이 포함한 순서대로 레시피들을 추천합니다. 레시피를 선택해주세요.</p>
        </div>
        <!-- Recipe Card -->
        <div name="card" class="card-custom">
          <div class="cropped" style="text-align:center; width: 100%; height: 50%; overflow: hidden; border-radius: 5%;">
            <img src="@/assets/vicky-ng-8hCcjf2BxTk-unsplash.jpg" width="100%" style="margin: -30%; ">
          </div>
          <div style="height: 10%;"><h6 style="text-align:center; margin-top: 10px;">비빔밥</h6></div>
          <div style="height: 30%;"><span>재료 : {{ingredients}}</span></div>
          <div style="height: 10%; width: 100%; text-align:center;">
            <p>선택
              <label>
                <input type="checkbox" class="form-check-input">
              </label>
            </p>
          </div>
        </div>
        <div name="card">
          <div class="card-custom" style="text-align:center;">
            <h5>비빔밥</h5>
          </div>
        </div>
        <div name="card">
          <div class="card-custom" style="text-align:center;">
            <h5>비빔밥</h5>
          </div>
        </div>
        <div name="card">
          <div class="card-custom" style="text-align:center;">
            <h5>비빔밥</h5>
          </div>
        </div>
        <div name="card">
          <div class="card-custom" style="text-align:center;">
            <h5>비빔밥</h5>
          </div>
        </div>
        <div name="card">
          <div class="card-custom" style="text-align:center;">
            <h5>비빔밥</h5>
          </div>
        </div>
        <div id="next-button" style="text-align:center;" >
          <a href="/mealplan/step2">
            <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" onClick="location.href=/mealplan/step2">
          </a>
        </div>
      </section>
    </div>
  </div>
</body>

</template>
<script>
export default {
  components: {},
  data () {
    return {
      ingredients: '재료1, 재료2, 재료3, 재료4, 재료5, 재료6, 재료7'
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>

<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
  .btn-custom {
    margin-bottom: 20px;
  }
  .card-custom {
    background-color: #f3f3f3;
    width: 30%;
    height: 300px;
    border-radius: 1rem;
    padding: 10px;
    float: left;
    margin: 1.6%;
  }
</style>
