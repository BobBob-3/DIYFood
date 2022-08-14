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
        <img src="@/assets/check-list.png" alt="식단계획1" height="200" width="200" >
      </div>
      <div style="margin-top: 30px; text-align: center;">
        <h3>1. 기간 · 지역 설정</h3>
      </div>
    </aside>
    <!-- Content -->
    <section id="content">
      <div style="margin-left: 30px">
        <p></p>
        <form>
          <h5>1. 하루 식사 횟수를 설정해주세요.</h5>
          <label class="margin_left"><input type="radio" name="식사 횟수" value="1">  한 끼</label>
          <label class="margin_left"><input type="radio" name="식사 횟수" value="2">  두 끼</label>
          <label class="margin_left"><input type="radio" name="식사 횟수" value="3">  세 끼</label>
        </form>
        <p></p>
        <h5>2. 예산을 설정해주세요. (1인분 기준)</h5>
        <label class="margin_left">
          <input type="number" min="1" max="20">  만원 ~
          <input type="number" min="1" max="20">  만원
        </label>
        <p></p>
        <form>
          <h5>3. 날짜를 설정해주세요.</h5>
            <label class="margin_left">
              <input type="radio" name="날짜" id="오늘" value="오늘">  오늘
            </label>
            <label class="margin_left">
              <input type="radio" name="날짜" id="직접 설정" value="직접 설정" checked>  직접 설정
            </label>
            <label style="margin-left:10px"><input type="date" name="날짜"> </label>
        </form>
        <p></p>
        <form>
          <h5>4. 지역을 설정해주세요.</h5>
          <select name="지역" class="margin_left">
              <option value="">지역</option>
              <option value="서울">서울</option>
              <option value="부산">부산</option>
              <option value="대구">대구</option>
              <option value="인천">인천</option>
              <option value="광주">광주</option>
              <option value="대전">대전</option>
              <option value="울산">울산</option>
              <option value="세종">세종</option>
              <option value="수원">수원</option>
              <option value="의정부">의정부</option>
              <option value="춘천">춘천</option>
              <option value="강릉">강릉</option>
              <option value="청주">청주</option>
              <option value="전주">전주</option>
              <option value="순천">순천</option>
              <option value="포항">포항</option>
              <option value="안동">안동</option>
              <option value="창원">창원</option>
              <option value="제주">제주</option>
          </select>
        </form>
      </div>
      <div id="next" style="text-align:center;" >
        <input type="button" class="next-button" value="NEXT" onClick="location.href='/mealplan/step2'">
      </div>
    </section>
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
