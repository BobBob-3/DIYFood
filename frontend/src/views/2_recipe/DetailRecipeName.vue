<template>
  <body id="page">
    <!-- 음식명 -->
    <p style="font-size:4em; font-weight:500; line-height:70px; margin-left:10px; margin-top: 40px; margin-bottom: 30px;">
      {{RCP_NM}}
    </p>
    <!-- 사진, 재료, 영양성분 -->
    <div style="width: 30%; float:left;">
      <div style="margin-bottom: 30px; margin-right: 30px; width: 90%;">
        <img :src=ATT_FILE_NO_MAIN :alt=RCP_NM style="border-radius: 5%; float: left;" width="100%"  onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
      </div>
      <div style="float:left; margin-top: 30px; margin-right: 20px;">
        <h3>재료</h3>
        <p style="font-size:1.2rem; margin-bottom: 30px;">{{RCP_PARTS_DTLS}}</p>
        <h3>영양 정보</h3>
        <p style="font-size:1.2rem">
          열량: {{INFO_ENG}} kcal<br>지방: {{INFO_FAT}} g<br>단백질: {{INFO_PRO}} g<br>탄수화물: {{INFO_CAR}} g<br>나트륨: {{INFO_NA}} mg
        </p>
      </div>
    </div>
    <!-- 조리법 -->
    <div class="content-box">
      <div>
        <h2>조리 순서</h2>
          <div style="font-size:1.2rem;">
            <div class="recipe-box">
              <img class="recipe-img" :src=MANUAL_IMG01>
              <div class="recipe-card">
                <p class="recipe-text">{{MANUAL01.replace('1.','')}}</p>
              </div>
            </div>
            <div class="recipe-box">
              <img class="recipe-img" :src=MANUAL_IMG02>
              <div class="recipe-card">
                <p class="recipe-text">{{MANUAL02.replace('2.','')}}</p>
              </div>
            </div>
            <div class="recipe-box">
              <img class="recipe-img" :src=MANUAL_IMG03>
              <div class="recipe-card">
                <p class="recipe-text">{{MANUAL03.replace('3.','')}}</p>
              </div>
            </div>
            <div class="recipe-box">
              <img class="recipe-img" :src=MANUAL_IMG04>
              <div class="recipe-card">
                <p class="recipe-text">{{MANUAL04.replace('4.','')}}</p>
              </div>
            </div>
            <div class="recipe-box">
              <img class="recipe-img" :src=MANUAL_IMG05>
              <div class="recipe-card">
                <p class="recipe-text">{{MANUAL05.replace('5.','')}}</p>
              </div>
            </div>
            <div class="recipe-box">
              <img class="recipe-img" :src=MANUAL_IMG06>
              <div class="recipe-card">
                <p class="recipe-text">{{MANUAL06.replace('6.','')}}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </body>
</template>

<script>

/* eslint-disable */
export default {
  name: 'DetailRecipe',
  components: { },
  data () {
    return {
      RCP_NM: localStorage.getItem('RCP_NM'),
      ATT_FILE_NO_MAIN: localStorage.getItem('ATT_FILE_NO_MAIN'),
      RCP_PARTS_DTLS: localStorage.getItem('RCP_PARTS_DTLS'),
      INFO_ENG: localStorage.getItem('INFO_ENG'),
      INFO_FAT: localStorage.getItem('INFO_FAT'),
      INFO_PRO: localStorage.getItem('INFO_PRO'),
      INFO_CAR: localStorage.getItem('INFO_CAR'),
      INFO_NA: localStorage.getItem('INFO_NA'),
      MANUAL_IMG01: localStorage.getItem('MANUAL_IMG01'),
      MANUAL_IMG02: localStorage.getItem('MANUAL_IMG02'),
      MANUAL_IMG03: localStorage.getItem('MANUAL_IMG03'),
      MANUAL_IMG04: localStorage.getItem('MANUAL_IMG04'),
      MANUAL_IMG05: localStorage.getItem('MANUAL_IMG05'),
      MANUAL_IMG06: localStorage.getItem('MANUAL_IMG06'),
      MANUAL01: localStorage.getItem('MANUAL01'),
      MANUAL02: localStorage.getItem('MANUAL02'),
      MANUAL03: localStorage.getItem('MANUAL03'),
      MANUAL04: localStorage.getItem('MANUAL04'),
      MANUAL05: localStorage.getItem('MANUAL05'),
      MANUAL06: localStorage.getItem('MANUAL06')
    }
  },
  setup () {},
  created () {
    this.foodCode = this.$route.params.foodCode
    this.getDetailRecipe(this.foodCode)
  },
  mounted () {},
  unmounted () {},
  methods: {
  }
}
</script>

<style>
@import "@/css/styles.css";
body{
  background-color: #f3f3f3;
  padding-left: 3%;
  padding-right: 3%;}
.content-box{
  width:70%;
  float: right;
  height:fit-content;
  background-color: transparent;
  margin-bottom: 30px;
  padding-left: 2%;
  overflow: auto;
  white-space: normal;
  border-left: 1px solid lightgray;
  text-align: center;
}
.recipe-box {
  width:80%;
  height:200px;
  display: inline-block;
  margin: 20px;
}
.recipe-card {
  width: 55%;
  height: 200px;
  background-color: white;
  border-radius: 30px;
  padding: 15px;
  display: inline-block;
  text-align: left;
}
.recipe-text {
  height: 100%;
  padding: 10px;
  float: left;
  vertical-align: middle;
}
.recipe-img {
  width: 40%;
  height: 200px;
  float:left;
  border-radius: 30px;
  margin-right: 10px;
}
</style>
