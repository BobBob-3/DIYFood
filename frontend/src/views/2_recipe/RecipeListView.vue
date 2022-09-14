<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <a href="/recipe">
        <span style="font-size:4em; font-weight:500; line-height:70px;">
          RECIPE
        </span>
      </a>
      <span style="font-size:1.5em; font-weight:400;">
        요리법 정보를 제공합니다.
      </span>
    </div>
    <!-- 레시피 목록 -->
    <div class="content-box">
      <!-- 검색창 -->
      <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 search-box">
        <div class="input-group">
          <div class="input-group-prepend">
            <button id="button-addon2" class="btn btn-link text-warning" @click="searchRecipe(keyword, 1)" disabled><img src="https://cdn-icons-png.flaticon.com/512/7847/7847425.png" width="25px"></button>
          </div>
          <input type="search" placeholder="음식명 또는 재료를 검색해주세요" aria-describedby="button-addon2" class="form-control border-0 bg-light" v-model="keyword">
          <button id="button-addon2" class="search-btn" @click="searchFood(keyword, 1)">음식</button>
          <button id="button-addon2" class="search-btn" style="margin-right:10px;" @click="searchIngredient(keyword, 1)">재료</button>
        </div>
      </div>
      <!-- Loading -->
      <div style="width:100%">
        <div v-if="isLoading" class="loading-container">
          <div class="loading">
            <Fade-loader />
          </div>
          <div class="loading-text">
            <h5>레시피를 불러오고 있습니다.</h5>
          </div>
        </div>
      </div>
      <div v-for="(contents, i) in recipeList" :key="i">
        <a :href="`/recipe/foodname/${contents.RCP_NM}`" target="_blank" @click="saveContents(contents)">
          <div name="card" class="card-custom">
            <div class="cropped" style="text-align:center; width: 100%; height: 50%; overflow: hidden; border-radius: 5%;">
              <img :src=contents.ATT_FILE_NO_MAIN width="100%" style="margin: -10%;">
            </div>
            <div style="height: 7%;"><h6 style="text-align:center; margin-top: 10px;">{{contents.RCP_NM}}</h6></div>
            <div class="word" style="height: 20%;"><span>재료 : {{contents.RCP_PARTS_DTLS}}</span></div>
            <div class="word" style="height: 20%;"><span>조리법 : {{contents.MANUAL01}}{{contents.MANUAL02}}{{contents.MANUAL03}}...</span></div>
          </div>
        </a>
      </div>
      <!-- 페이지네이션 -->
      <div v-if="this.isLoading === false && this.keyword === ''" class="pagination-wrapper">
        <div class="pagination">
          <button v-if="pnStart > 1" class="btn prev page-numbers" @click="pageClick(pnStart - 1)">prev</button>
          <button v-if="pnStart === 1" class="btn prev page-numbers" disabled>prev</button>

          <button v-if="this.pageNum === this.pnStart" aria-current="page" class="btn page-numbers current">{{pnStart}}</button>
          <button v-if="this.pageNum !== this.pnStart" class="btn page-numbers" @click="pageClick(pnStart)">{{pnStart}}</button>

          <button v-if="this.pageNum === this.pnStart + 1" aria-current="page" class="btn page-numbers current">{{pnStart + 1}}</button>
          <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 <= pnTotal" class="btn page-numbers" @click="pageClick(pnStart + 1)">{{pnStart + 1}}</button>
          <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 1}}</button>

          <button v-if="this.pageNum === this.pnStart + 2" aria-current="page" class="btn page-numbers current">{{pnStart + 2}}</button>
          <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 <= pnTotal" class="btn page-numbers" @click="pageClick(pnStart + 2)">{{pnStart + 2}}</button>
          <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 2}}</button>

          <button v-if="this.pageNum === this.pnStart + 3" aria-current="page" class="btn page-numbers current">{{pnStart + 3}}</button>
          <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 <= pnTotal" class="btn page-numbers" @click="pageClick(pnStart + 3)">{{pnStart + 3}}</button>
          <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 3}}</button>

          <button v-if="this.pageNum === this.pnEnd" aria-current="page" class="btn page-numbers current">{{pnEnd}}</button>
          <button v-if="this.pageNum !== this.pnEnd && this.pnEnd <= pnTotal" class="btn page-numbers" @click="pageClick(pnEnd)">{{pnEnd}}</button>
          <button v-if="this.pageNum !== this.pnEnd && this.pnEnd > pnTotal" class="btn page-numbers" disabled>{{pnEnd}}</button>

          <button v-if="pnEnd < pnTotal" class="btn next page-numbers" @click="pageClick(pnEnd + 1)">next</button>
          <button v-if="pnEnd > pnTotal" class="btn next page-numbers" disabled>next</button>
        </div>
      </div>
      <!-- 음식명 검색 페이징 -->
      <div v-if="this.isLoading === false && this.keyword != '' && this.searchCode === 0" class="pagination-wrapper">
        <div class="pagination">
          <button v-if="pnStart > 1" class="btn prev page-numbers" @click="searchFood(keyword, pnStart - 1)">prev</button>
          <button v-if="pnStart === 1" class="btn prev page-numbers" disabled>prev</button>

          <button v-if="this.pageNum === this.pnStart" aria-current="page" class="btn page-numbers current">{{pnStart}}</button>
          <button v-if="this.pageNum !== this.pnStart" class="btn page-numbers" @click="searchFood(keyword, pnStart)">{{pnStart}}</button>

          <button v-if="this.pageNum === this.pnStart + 1" aria-current="page" class="btn page-numbers current">{{pnStart + 1}}</button>
          <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 <= pnTotal" class="btn page-numbers" @click="searchFood(keyword, pnStart + 1)">{{pnStart + 1}}</button>
          <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 1}}</button>

          <button v-if="this.pageNum === this.pnStart + 2" aria-current="page" class="btn page-numbers current">{{pnStart + 2}}</button>
          <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 <= pnTotal" class="btn page-numbers" @click="searchFood(keyword, pnStart + 2)">{{pnStart + 2}}</button>
          <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 2}}</button>

          <button v-if="this.pageNum === this.pnStart + 3" aria-current="page" class="btn page-numbers current">{{pnStart + 3}}</button>
          <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 <= pnTotal" class="btn page-numbers" @click="searchFood(keyword, pnStart + 3)">{{pnStart + 3}}</button>
          <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 3}}</button>

          <button v-if="this.pageNum === this.pnEnd" aria-current="page" class="btn page-numbers current">{{pnEnd}}</button>
          <button v-if="this.pageNum !== this.pnEnd && this.pnEnd <= pnTotal" class="btn page-numbers" @click="searchFood(keyword, pnEnd)">{{pnEnd}}</button>
          <button v-if="this.pageNum !== this.pnEnd && this.pnEnd > pnTotal" class="btn page-numbers" disabled>{{pnEnd}}</button>

          <button v-if="pnEnd < pnTotal" class="btn next page-numbers" @click="searchFood(keyword, pnEnd + 1)">next</button>
          <button v-if="pnEnd > pnTotal" class="btn next page-numbers" disabled>next</button>
        </div>
      </div>
      <!-- 재료 검색 페이징 -->
      <div v-if="this.isLoading === false && this.keyword != '' && this.searchCode === 1" class="pagination-wrapper">
        <div class="pagination">
          <button v-if="pnStart > 1" class="btn prev page-numbers" @click="searchIngredient(keyword, pnStart - 1)">prev</button>
          <button v-if="pnStart === 1" class="btn prev page-numbers" disabled>prev</button>

          <button v-if="this.pageNum === this.pnStart" aria-current="page" class="btn page-numbers current">{{pnStart}}</button>
          <button v-if="this.pageNum !== this.pnStart" class="btn page-numbers" @click="searchIngredient(keyword, pnStart)">{{pnStart}}</button>

          <button v-if="this.pageNum === this.pnStart + 1" aria-current="page" class="btn page-numbers current">{{pnStart + 1}}</button>
          <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 <= pnTotal" class="btn page-numbers" @click="searchIngredient(keyword, pnStart + 1)">{{pnStart + 1}}</button>
          <button v-if="this.pageNum !== this.pnStart + 1 && this.pnStart + 1 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 1}}</button>

          <button v-if="this.pageNum === this.pnStart + 2" aria-current="page" class="btn page-numbers current">{{pnStart + 2}}</button>
          <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 <= pnTotal" class="btn page-numbers" @click="searchIngredient(keyword, pnStart + 2)">{{pnStart + 2}}</button>
          <button v-if="this.pageNum !== this.pnStart + 2 && this.pnStart + 2 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 2}}</button>

          <button v-if="this.pageNum === this.pnStart + 3" aria-current="page" class="btn page-numbers current">{{pnStart + 3}}</button>
          <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 <= pnTotal" class="btn page-numbers" @click="searchIngredient(keyword, pnStart + 3)">{{pnStart + 3}}</button>
          <button v-if="this.pageNum !== this.pnStart + 3 && this.pnStart + 3 > pnTotal" class="btn page-numbers" disabled>{{pnStart + 3}}</button>

          <button v-if="this.pageNum === this.pnEnd" aria-current="page" class="btn page-numbers current">{{pnEnd}}</button>
          <button v-if="this.pageNum !== this.pnEnd && this.pnEnd <= pnTotal" class="btn page-numbers" @click="searchIngredient(keyword, pnEnd)">{{pnEnd}}</button>
          <button v-if="this.pageNum !== this.pnEnd && this.pnEnd > pnTotal" class="btn page-numbers" disabled>{{pnEnd}}</button>

          <button v-if="pnEnd < pnTotal" class="btn next page-numbers" @click="searchIngredient(keyword, pnEnd + 1)">next</button>
          <button v-if="pnEnd > pnTotal" class="btn next page-numbers" disabled>next</button>
        </div>
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
      pageNum: '',
      pnStart: '',
      pnEnd: '',
      pnTotal: '',
      keyword: '',
      searchCode: ''
    }
  },
  setup () {},
  created () {
    this.pageClick(1)
  },
  mounted () {},
  unmounted () {},
  methods: {
    searchFood (keyword, page) {
      this.searchCode = 0
      if (keyword === '') {
        alert('검색어를 입력해주세요.')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isLoading = true
        this.$axios.get(`http://localhost:3000/recipe/list/search?recipeName=${keyword}&pageNum=${page}`, { withCredentials: true })
          .then((response) => {
            console.log('### response: ' + JSON.stringify(response))
            this.recipeList = response.data.contents
            this.pageNum = response.data.pageNum
            this.pnStart = response.data.pnStart
            this.pnEnd = response.data.pnEnd
            this.pnTotal = response.data.pnTotal
            console.log(this.recipeList)
            this.isLoading = false
          }).catch(error => {
            console.log(error)
          })
      }
    },
    searchIngredient (keyword, page) {
      this.searchCode = 1
      if (keyword === '') {
        alert('검색어를 입력해주세요.')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.isLoading = true
        this.$axios.get(`http://localhost:3000/recipe/list/search?ingredientName=${keyword}&pageNum=${page}`, { withCredentials: true })
          .then((response) => {
            console.log('### response: ' + JSON.stringify(response))
            this.recipeList = response.data.contents
            this.pageNum = response.data.pageNum
            this.pnStart = response.data.pnStart
            this.pnEnd = response.data.pnEnd
            this.pnTotal = response.data.pnTotal
            console.log(this.recipeList)
            this.isLoading = false
          }).catch(error => {
            console.log(error)
          })
      }
    },
    pageClick (index) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.isLoading = true
      const url = `http://localhost:3000/recipe/list?pageNum=${index}`
      this.$axios.get(url, { withCredentials: true })
        .then((response) => {
          console.log('### response: ' + JSON.stringify(response))
          this.recipeList = response.data.contents
          this.pageNum = response.data.pageNum
          this.pnStart = response.data.pnStart
          this.pnEnd = response.data.pnEnd
          this.pnTotal = response.data.pnTotal
          console.log(this.recipeList)
          this.isLoading = false
        }).catch(error => {
          console.log(error)
        })
    },
    saveContents (contents) {
      localStorage.setItem('RCP_NM', contents.RCP_NM)
      localStorage.setItem('ATT_FILE_NO_MAIN', contents.ATT_FILE_NO_MAIN)
      localStorage.setItem('RCP_PARTS_DTLS', contents.RCP_PARTS_DTLS)
      localStorage.setItem('INFO_ENG', contents.INFO_ENG)
      localStorage.setItem('INFO_FAT', contents.INFO_FAT)
      localStorage.setItem('INFO_PRO', contents.INFO_PRO)
      localStorage.setItem('INFO_CAR', contents.INFO_CAR)
      localStorage.setItem('INFO_NA', contents.INFO_NA)
      localStorage.setItem('MANUAL_IMG01', contents.MANUAL_IMG01)
      localStorage.setItem('MANUAL_IMG02', contents.MANUAL_IMG02)
      localStorage.setItem('MANUAL_IMG03', contents.MANUAL_IMG03)
      localStorage.setItem('MANUAL_IMG04', contents.MANUAL_IMG04)
      localStorage.setItem('MANUAL_IMG05', contents.MANUAL_IMG05)
      localStorage.setItem('MANUAL_IMG06', contents.MANUAL_IMG06)
      localStorage.setItem('MANUAL01', contents.MANUAL01)
      localStorage.setItem('MANUAL02', contents.MANUAL02)
      localStorage.setItem('MANUAL03', contents.MANUAL03)
      localStorage.setItem('MANUAL04', contents.MANUAL04)
      localStorage.setItem('MANUAL05', contents.MANUAL05)
      localStorage.setItem('MANUAL06', contents.MANUAL06)
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
body{
  background: #f3f3f3;
  padding-left: 3%;
  padding-right: 3%;}
.content-box{
  width:100%;
  height:fit-content;
  background-color:white;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 50px;
  text-align: left;
  overflow: auto;
}
.btn-custom {
  margin-bottom: 20px;
}
.card-custom {
  background-color: #f3f3f3;
  width: 23%;
  height: 400px;
  border-radius: 1rem;
  padding: 10px;
  float: left;
  margin: 1%;
}
.word {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: normal;
  word-wrap : break-word;
  text-align : left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
a {
  color: #212121;
  text-decoration: none
}
a:hover {
  color: #1a8051;
}
.form-control:focus {
  box-shadow: none;
}
.search-box {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
  box-shadow: none;
}
.search-btn {
  border-radius: 10px;
  border:none;
  color:#1a8051;
  background-color: transparent;
}
</style>
