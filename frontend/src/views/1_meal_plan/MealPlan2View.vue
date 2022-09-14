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
              <img src="https://cdn-icons-png.flaticon.com/512/1028/1028496.png" alt="식단계획2" height="50%" width="50%">
            </div>
            <div style="margin-top: 30px; text-align: center;">
              <h4>2. 보유 재료 선택</h4>
            </div>
          </div>
        <!-- Content -->
        <section id="content">
          <div style="text-align:center;">
            <h1>기존 보유 재료 선택</h1>
            <p>이미 보관 중인 재료를 선택해주세요. 선택하신 재료는 식재료 가격을 계산할 때 제외됩니다.
              <br>이전에 기존 보유 재료로 선택했던 항목은 체크된 채로 표시됩니다.</p>
            <div>
              <input v-if="this.categoryCode !== '1'" type="button" class="btn btn-primary btn-lg btn-custom" value="곡류" @click="searchItem('1')">
              <input v-if="this.categoryCode === '1'" type="button" class="btn btn-clicked btn-lg btn-custom" value="곡류" @click="searchItem('1')">

              <input v-if="this.categoryCode !== '3'" type="button" class="btn btn-primary btn-lg btn-custom" value="견과·버섯" @click="searchItem('3')">
              <input v-if="this.categoryCode === '3'" type="button" class="btn btn-clicked btn-lg btn-custom" value="견과·버섯" @click="searchItem('3')">

              <input v-if="this.categoryCode !== '2'" type="button" class="btn btn-primary btn-lg btn-custom" value="채소류" @click="searchItem('2')">
              <input v-if="this.categoryCode === '2'" type="button" class="btn btn-clicked btn-lg btn-custom" value="채소류" @click="searchItem('2')">

              <input v-if="this.categoryCode !== '4'" type="button" class="btn btn-primary btn-lg btn-custom" value="과일류" @click="searchItem('4')">
              <input v-if="this.categoryCode === '4'" type="button" class="btn btn-clicked btn-lg btn-custom" value="과일류" @click="searchItem('4')">

              <input v-if="this.categoryCode !== '5'" type="button" class="btn btn-primary btn-lg btn-custom" value="축산물" @click="searchItem('5')">
              <input v-if="this.categoryCode === '5'" type="button" class="btn btn-clicked btn-lg btn-custom" value="축산물" @click="searchItem('5')">

              <input v-if="this.categoryCode !== '6'" type="button" class="btn btn-primary btn-lg btn-custom" value="수산물" @click="searchItem('6')">
              <input v-if="this.categoryCode === '6'" type="button" class="btn btn-clicked btn-lg btn-custom" value="수산물" @click="searchItem('6')">
            </div>
            <div class="box-item">
              <p><img src="@/assets/shopping-basket.png" width="20px" style="margin-bottom: 5px">  {{this.checkedItemName}}</p>
            </div>
            <table class="table table-light" style="vertical-align: middle;">
              <thead class="table-bordered">
                <tr>
                  <th scope="col" style="width:10%">순번</th>
                  <th scope="col" style="width:40%">품목</th>
                  <th scope="col" style="width:10%">선택</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in itemList" :key="i">
                  <td>{{i + 1}}</td>
                  <td>{{data.itemName}}</td>
                  <td>
                    <label class="form-checkbox">
                      <input type="checkbox" class="form-check-input" :value="data.itemCode" v-model="checkedItemCode" @click="selectItem(i)">
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="next-button" style="text-align:center;" >
            <a href="/mealplan/step3">
              <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" @click="submitItemList()">
            </a>
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
export default {
  components: {},
  data () {
    return {
      itemList: [],
      checkedItemCode: [],
      checkedItemName: [],
      metaItemList: [],
      selected: [],
      categoryCode: '1',
      userExistList: [],
      allItemList: []
    }
  },
  setup () {},
  created () {
    this.getIngredientData()
    this.getUserExistList()
    // 기존 보유 재료 이름 표시
    setTimeout(() => {
      for (var i = 0; i < this.allItemList.length; i++) {
        if (this.checkedItemCode.includes(this.allItemList[i].itemCode)) {
          this.checkedItemName.push(this.allItemList[i].itemName)
        }
      }
    }, 1000)
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 식재료 목록 불러오기
    getIngredientData () {
      this.$axios.get('http://localhost:3000/ingredient/existlist', { withCredentials: true }).then(response => {
        this.itemList = response.data
        this.metaItemList = response.data
        this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) === 1)
        this.allItemList = response.data
        console.log(this.allItemList)
      }).catch(error => {
        console.log(error)
      })
    },
    // 사용자 보유재료 리스트 가져오기
    getUserExistList () {
      this.$axios.get('http://localhost:3000/ingredient/userexistlist', { withCredentials: true }).then(response => {
        this.userExistList = response.data
        this.checkedItemCode = this.userExistList.map(a => a.itemCode)
      }).catch(error => {
        console.log(error)
      })
    },
    // 종류 버튼 아이템 필터링 이벤트
    searchItem (code) {
      // eslint-disable-next-line
      this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) == code)
      this.categoryCode = code
    },
    // 아이템 추가/삭제
    selectItem (n) {
      if (this.checkedItemName.includes(this.itemList[n].itemName) === false) {
        this.checkedItemName.push(this.itemList[n].itemName)
        console.log(this.checkedItemCode)
      } else {
        this.checkedItemName.splice(this.checkedItemName.indexOf(this.itemList[n].itemName), 1)
        console.log(this.checkedItemCode)
      }
    },
    // 선택한 식재료 리스트 보내기
    /* eslint-disable */
    submitItemList () {
      this.$axios.post('http://localhost:3000/ingredient/existlist', this.checkedItemCode, {withCredentials:true})
        .then(function (res) {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
      localStorage.setItem('haveItem', this.checkedItemName)
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
  }
  .btn-custom {
    margin-bottom: 20px;
    width: 110px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  }
  .btn-warning {
    color:black
  }
</style>
