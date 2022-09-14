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
          <p>선택하신 재료를 가장 많이 포함한 순서대로 레시피들을 추천합니다. 레시피를 선택해주세요.
            <br>사진을 클릭하면 해당 레시피가 새 창으로 열립니다.
          </p>
        </div>
        <!-- 푸드카테고리 버튼 -->
        <div style="text-align:center;">
          <input v-if="this.categoryCode !== 0" type="button" class="btn btn-primary btn-lg btn-custom" value="밥" @click="getRecipeData(date_start, 0, 0)">
          <input v-if="this.categoryCode === 0" type="button" class="btn btn-clicked btn-lg btn-custom" value="밥" @click="getRecipeData(date_start, 0, 0)">

          <input v-if="this.categoryCode !== 1" type="button" class="btn btn-primary btn-lg btn-custom" value="반찬" @click="getRecipeData(date_start, 1, 0)">
          <input v-if="this.categoryCode === 1" type="button" class="btn btn-clicked btn-lg btn-custom" value="반찬" @click="getRecipeData(date_start, 1, 0)">

          <input v-if="this.categoryCode !== 2" type="button" class="btn btn-primary btn-lg btn-custom" value="국 · 찌개" @click="getRecipeData(date_start, 2, 0)">
          <input v-if="this.categoryCode === 2" type="button" class="btn btn-clicked btn-lg btn-custom" value="국 · 찌개" @click="getRecipeData(date_start, 2, 0)">

          <input v-if="this.categoryCode !== 3" type="button" class="btn btn-primary btn-lg btn-custom" value="일품" @click="getRecipeData(date_start, 3, 0)">
          <input v-if="this.categoryCode === 3" type="button" class="btn btn-clicked btn-lg btn-custom" value="일품" @click="getRecipeData(date_start, 3, 0)">

          <input v-if="this.categoryCode !== 5" type="button" class="btn btn-primary btn-lg btn-custom" value="후식" @click="getRecipeData(date_start, 5, 0)">
          <input v-if="this.categoryCode === 5" type="button" class="btn btn-clicked btn-lg btn-custom" value="후식" @click="getRecipeData(date_start, 5, 0)">

          <input v-if="this.categoryCode !== 4" type="button" class="btn btn-primary btn-lg btn-custom" value="기타" @click="getRecipeData(date_start, 4, 0)">
          <input v-if="this.categoryCode === 4" type="button" class="btn btn-primary btn-lg btn-custom" value="기타" @click="getRecipeData(date_start, 4, 0)">
        </div>
        <div class="box-item-custom" style="text-align: center;">
          <p><img src="https://cdn-icons-png.flaticon.com/128/308/308556.png" width="20px" style="margin-bottom:10px">  {{this.checkedItemName}}</p>
        </div>
        <div style="width:100%">
          <!-- Loading -->
          <div v-if="isLoading" class="loading-container">
            <div class="loading">
              <Fade-loader />
            </div>
            <div class="loading-text">
              <h5>선택하신 재료를 기준으로 레시피를 조회하는 중입니다.</h5>
            </div>
          </div>
          <!-- Recipe Card -->
          <div v-for="(contents, index) in recipeList" :key="index">
            <div name="card" class="card-custom">
              <a :href="`/recipe/foodcode/${contents.foodCode}`" target="_blank">
                <div class="cropped" style="text-align:center; width: 100%; height: 50%; overflow: hidden; border-radius: 10px;">
                  <img :src=contents.foodImage width="100%" style="margin: -25%;" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
                </div>
              </a>
              <div style="height: 10%;"><h6 style="text-align:center; margin-top: 10px;">{{contents.foodName}}</h6></div>
              <div class="word" style="height: 30%;"><span>재료 : {{contents.foodIngredient}}</span></div>
              <div style="height: 10%; width: 100%; text-align:center;">
                <span style="float:left;">재료 매칭률 : {{parseInt(contents.percent)}}%</span>
                <span style="float:right;"><b style="margin-right:5px">선택</b>
                  <label>
                    <input type="checkbox" class="form-check-input" :value="contents.foodCode" v-model="checkedList" @click="selectItem(index)">
                  </label>
                </span>
              </div>
            </div>
          </div>
          <!-- 페이지네이션 -->
          <div v-if="this.isLoading === false" class="pagination-wrapper">
            <div class="pagination">
              <button v-if="pnStart > 1" class="btn prev page-numbers" @click="getRecipeData(date_start, categoryCode, pnStart - 1)">prev</button>
              <button v-if="pnStart = 1" class="btn prev page-numbers" disabled>prev</button>

              <button v-if="this.pageNum === this.pnStart" aria-current="page" class="btn page-numbers current">{{pnStart}}</button>
              <button v-if="this.pageNum !== this.pnStart" class="btn page-numbers" @click="getRecipeData(date_start, categoryCode, pnStart)">{{pnStart}}</button>

              <button v-if="this.pageNum === this.pnStart + 1" aria-current="page" class="btn page-numbers current">{{pnStart + 1}}</button>
              <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 <= pnTotal" class="btn page-numbers" @click="getRecipeData(date_start, categoryCode, pnStart + 1)">{{pnStart + 1}}</button>
              <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 1}}</button>

              <button v-if="this.pageNum === this.pnStart + 2" aria-current="page" class="btn page-numbers current">{{pnStart + 2}}</button>
              <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 <= pnTotal" class="btn page-numbers" @click="getRecipeData(date_start, categoryCode, pnStart + 2)">{{pnStart + 2}}</button>
              <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 2}}</button>

              <button v-if="this.pageNum === this.pnStart + 3" aria-current="page" class="btn page-numbers current">{{pnStart + 3}}</button>
              <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 <= pnTotal" class="btn page-numbers" @click="getRecipeData(date_start, categoryCode, pnStart + 3)">{{pnStart + 3}}</button>
              <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 3}}</button>

              <button v-if="this.pageNum === this.pnEnd" aria-current="page" class="btn page-numbers current">{{pnEnd}}</button>
              <button v-if="this.pageNum !== this.pnEnd && this.pnEnd <= pnTotal" class="btn page-numbers" @click="getRecipeData(date_start, categoryCode, pnEnd)">{{pnEnd}}</button>
              <button v-if="this.pageNum !== this.pnEnd && this.pnEnd > pnTotal" class="btn page-numbers" disabled>{{pnEnd}}</button>

              <button v-if="pnEnd < pnTotal" class="btn next page-numbers" @click="getRecipeData(date_start, categoryCode, pnEnd + 1)">next</button>
              <button v-if="pnEnd > pnTotal" class="btn next page-numbers" disabled>next</button>
            </div>
          </div>
        </div>
        <div style="text-align:center; width:100%" >
          <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" style="width: 17%; margin-left: 40%; margin-right: 40%; box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);" @click="submitRecipeList()">
        </div>
      </section>
    </div>
  </div>
  <div>
    <button class="btn-up" @click="upClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130906.png" width="20px"></button>
    <button class="btn-down" @click="downClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130907.png" width="20px"></button>
  </div>
</body>
</template>

<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default {
  components: { FadeLoader },
  data () {
    return {
      isLoading: true,
      recipeList: [],
      checkedList: [],
      checkedItemName: [],
      date_start: localStorage.getItem('date_start'),
      categoryCode: 0,
      pageNum: '',
      pnStart: '',
      pnEnd: '',
      pnTotal: ''
    }
  },
  setup () {},
  created () {
    this.getRecipeData(this.date_start, 0, 1)
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 아이템 추가/삭제
    selectItem (n) {
      if (this.checkedItemName.includes(this.recipeList[n].foodName) === false) {
        this.checkedItemName.push(this.recipeList[n].foodName)
      } else {
        this.checkedItemName.splice(this.checkedItemName.indexOf(this.recipeList[n].foodName), 1)
      }
    },
    // 레시피 조회하기
    getRecipeData (date, code, page) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.isLoading = true
      // eslint-disable-next-line
      this.$axios.get(`http://localhost:3000/recipe/recommendlist?date=${date}&category=${code}&pageNum=${page}`, { withCredentials: true }).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.recipeList = response.data.contents
        this.pageNum = response.data.pageNum
        this.pnStart = response.data.pnStart
        this.pnEnd = response.data.pnEnd
        this.pnTotal = response.data.pnTotal
        this.isLoading = false
        this.categoryCode = code
      }).catch(error => {
        console.log(error)
      })
    },
    // 선택 레시피 제출
    submitRecipeList () {
      const url = 'http://localhost:3000/recipe/recommendlist'
      const data = { recipeList: this.checkedList, date: this.date_start }
      this.$axios.post(url, data, { withCredentials: true })
      console.log(data)
      localStorage.setItem('recipe', this.checkedItemName)
      location.href = '/mealplan/step5'
    },
    upClick () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    downClick () {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }
}
</script>

<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
  .btn-custom {
    margin-bottom: 20px;
    width: 110px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  }
  .card-custom {
    background-color: #f3f3f3;
    width: 30%;
    height: 350px;
    border-radius: 1rem;
    padding: 10px;
    float: left;
    margin: 1.6%;
  }
  .box-item-custom {
    width: 95%;
    margin-right:2.5%;
    margin-left: 2.5%;
    height: auto;
    background-color: #f3f3f3;
    border-radius: 5px;
    padding: 5px;
    padding-bottom:0px;
    margin-bottom: 10px;
  }
  .word {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-wrap : break-word;
    text-align : left;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .loading {
    z-index: 2;
    position: relative;
    top: 25%;
    left: 100%;
    transform: translate(-50%, -50%);
  }
  .loading-text {
    text-align: center;
    position:relative;
    top: 65%;
    margin-bottom: 50px;
  }
  .loading-container {
    width: 100%;
    height: 230px;
  }
</style>
