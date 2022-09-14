<template>
<body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px; text-align: center;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MY MEAL PLAN
      </p>
    </div>
    <section class="content-box">
      <p></p>
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="display: flex;justify-content: center; margin-top: 20px; width: 100%;">
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(1)">1월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(2)">2월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(3)">3월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(4)">4월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(5)">5월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(6)">6월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(7)">7월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(8)">8월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(9)">9월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(10)">10월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(11)">11월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(12)">12월</button>
        </div>
        <p style="margin:20px; text-align: center; margin-left: 30%; margin-right: 30%;">조회할 기간(월)을 선택해주세요.
          <br>항목을 클릭하면 해당 레시피 페이지로 이동합니다.</p>
      </div>
      <div>
        <div v-for="item in Object.keys(this.groupBy(this.userRecipeList, 'date'))" :key="item">
          <div style="width: 100%; height: 50px; margin-left: 30px; overflow: auto;">
            <h3 style="float:left; margin-top: 7px;">{{new Date(Date.parse(item)).toLocaleDateString()}} - {{new Date(Date.parse(item)+518400000).toLocaleDateString()}}</h3>
            <button class="btn" style="float:left;" value="식단 지우기" @click="deletePlan(item)"><img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" width="30px"></button>
          </div>
          <div v-for="(data, i) in userRecipeList" :key="i">
            <div v-if="data.date === item">
              <div class="recipe-box" >
                <div class="recipe-card" style="display: flex;">
                  <div style="width:85%; height:100%;">
                    <a :href="`/recipe/foodcode/${data.foodCode}`">
                      <img :src=data.RecipeNutrient.foodImage class="food-img" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
                      <div class="word" style="vertical-align: middle; margin-left: 110px; margin-right:15px; margin-top: 8px;">
                        <p style="font-weight: 400; font-size:1.2rem">{{data.RecipeNutrient.foodName}}</p>
                      </div>
                    </a>
                  </div>
                  <div style="float:right; width:15%; height: 100px; text-align: center; vertical-align: middle;">
                    <button style="border: 1px solid transparent; background-color: transparent; height: 30px; margin-top: 35px;" @click="deleteRecipe(data.date, data.foodCode)"><img src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png" height="20px"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <!-- <div style="display: flex;">
          <h3 style="margin: 20px;">2022년 9월 2일 - 2022년 9월 8일</h3>
          <button class="btn" style="float:left" value="식단 지우기" @click="deletePlan('2022-9-14')"><img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" width="30px"></button>
        </div> -->
    </section>
    <div>
        <button class="btn-up" @click="upClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130906.png" width="20px"></button>
        <button class="btn-down" @click="downClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130907.png" width="20px"></button>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
export default {
  components: {},
  data () {
    return {
      month: '',
      userRecipeList: [],
      deletedRecipe: {}
    }
  },
  setup () {},
  created () {
    this.getUserRecipe((new Date()).getMonth()+1)
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 월별로 식단 계획 불러오기
    getUserRecipe (index) {
      this.month = index
      this.$axios.get(`http://localhost:3000/user/recipelist?month=${this.month}`, { withCredentials: true }).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.userRecipeList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 단일 레시피 삭제
    deleteRecipe (date, foodCode) {
      if (confirm('선택하신 레시피를 삭제하시겠습니까?')) {
        const url = `http://localhost:3000/user/recipe?date=${date}&foodCode=${foodCode}`
        this.$axios.delete(url, { withCredentials: true })
        alert('레시피가 삭제되었습니다.')
        location.reload()
      } else {
        console.log('다행 휴..')
      }
    },
    // 기간별 식단 계획 삭제
    deletePlan (date) {
      if (confirm('선택하신 기간의 식단 계획을 모두 삭제하시겠습니까?')) {
        const url = `http://localhost:3000/user/recipelist?date=${date}`
        this.$axios.delete(url,{ withCredentials: true })
        alert('식단 계획이 삭제되었습니다.')
        location.reload()
      } else {
        console.log('다행 휴..')
      }
    },
    // 오브젝트 groupBy
    groupBy (objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        // Add object to list for given key's value
        acc[key].push(obj)
        return acc
      }, {})
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
  float: left;
  width: 80%;
  height: auto;
  background-color:white;
  margin-bottom: 20px;
  margin-right:10%;
  margin-left: 10%;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 3%;
  padding-top: 1%;
}
.btn-custom {
  width: 70px;
  border-radius: 10px;
  border-color: white;
  border-radius: 10px;
}
.recipe-box {
  display:flex;
  justify-content: center;
  width: 50%;
  display: inline-block;
  float: left;
}
.recipe-card {
  width: 95%;
  height: 100px;
  background-color: #f3f3f3;
  margin: 2.5%;
  border-radius: 50px;
  text-align: left;
  padding: none;
  display: inline-block;
  float: left;
}
.food-img {
  margin: -18%;
  height: 90px;
  width: 90px;
  border-radius: 50%;
  position:relative;
  top: 36%;
  left: 19%;
}
a {
  color: #212121;
  text-decoration: none
}
a:hover {
  color: #1a8051;
}
.word {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap : break-word;
  text-align : left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
