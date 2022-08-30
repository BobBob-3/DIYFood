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
              <img src="https://cdn-icons-png.flaticon.com/512/2906/2906476.png" alt="식단계획3" height="50%" width="50%">
            </div>
            <div style="margin-top: 30px; text-align: center;">
              <h4>3. 새로운 재료 선택</h4>
            </div>
          </div>
        <!-- Content -->
        <section id="content">
          <div style="text-align:center;">
            <h1>새로운 식재료 선택</h1>
            <p>새롭게 구매하실 식재료를 선택해주세요. 선택한 식재료를 포함하는 레시피를 추천합니다.</p>
            <div>
              <input type="button" class="btn btn-primary btn-lg btn-custom" value="곡류" @click="searchItem('1')">
              <input type="button" class="btn btn-primary btn-lg btn-custom" value="견과·버섯" @click="searchItem('3')">
              <input type="button" class="btn btn-primary btn-lg btn-custom" value="채소류" @click="searchItem('2')">
              <input type="button" class="btn btn-primary btn-lg btn-custom" value="과일류" @click="searchItem('4')">
              <input type="button" class="btn btn-primary btn-lg btn-custom" value="축산물" @click="searchItem('5')">
              <input type="button" class="btn btn-primary btn-lg btn-custom" value="수산물" @click="searchItem('6')">
            </div>
            <div class="box-item" style="vertical-align: middle;">
              <span><img src="@/assets/shopping-cart.png" width="20px">  {{this.checkedItemName}}</span>
              <p style="color:gray">* 선택 버튼을 두번 누르면 선택이 해제됩니다.</p>
            </div>
            <table class="table table-light" style="vertical-align: middle;">
              <thead class="table-bordered">
                <tr>
                  <th scope="col" style="width:10%">순번</th>
                  <th scope="col" style="width:30%">품목</th>
                  <th scope="col" style="width:30%">품종</th>
                  <th scope="col" style="width:20%">가격</th>
                  <th scope="col" style="width:10%">선택</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in itemList" :key="i">
                  <td>{{i + 1}}</td>
                  <td>{{data.itemName}}</td>
                  <td>{{data.detailItemName}}</td>
                  <td>{{data.price}}원</td>
                  <td>
                    <label>
                      <input type="checkbox" class="form-check-input" :value="data.id" v-model="checkedID" @click="selectItem(i)">
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <progress id="progress" :value='totalCost' :max=budget></progress>
              <p>{{parseInt((totalCost / budget) * 100)}}%</p>
              <h6 style="width:100%">선택 식재료 가격 : {{totalCost.toLocaleString()}}원 | 나의 예산 : {{budget.toLocaleString()}}원</h6>
            </div>
          </div>
          <div id="next-button" style="text-align:center;" >
            <a href="/mealplan/step4">
              <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" @click="submitItemList()">
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
      itemList: [],
      checkedItemCode: [],
      checkedItemName: [],
      metaItemList: [],
      budget: parseInt(localStorage.getItem('budget')),
      totalCost: 0,
      subCodeList: [],
      finalCodeList: [],
      checkedID: []
    }
  },
  setup () {},
  created () {
    this.getIngredientData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 식재료 목록 불러오기
    getIngredientData () {
      this.$axios.get('http://localhost:3000/ingredient/userlist').then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.itemList = response.data
        this.metaItemList = response.data
        this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) === 1)
      }).catch(error => {
        console.log(error)
      })
    },
    // 종류 버튼 아이템 필터링 이벤트
    searchItem (code) {
      // eslint-disable-next-line
      this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) == code)
    },
    // 아이템 추가/삭제
    selectItem (n) {
      if (this.checkedItemCode.includes(this.bindingCode(n)) === false) {
        this.checkedItemCode.push(this.bindingCode(n))
        this.checkedItemName.push(this.itemList[n].itemName)
        this.totalCost = this.totalCost + parseInt(this.itemList[n].price.replace(',', ''))
        console.log(this.checkedItemCode)
      } else {
        this.checkedItemCode.splice(this.checkedItemCode.indexOf(this.bindingCode(n)), 1)
        this.checkedItemName.splice(this.checkedItemName.indexOf(this.itemList[n].itemName), 1)
        this.totalCost = this.totalCost - parseInt(this.itemList[n].price.replace(',', ''))
        console.log(this.checkedItemCode)
      }
    },
    // 품목코드 + 품종코드 합치기
    bindingCode (n) {
      var bindedCode = this.itemList[n].itemCode + '-' + this.itemList[n].detailItemCode + '-' + this.itemList[n].price.replace(',', '')
      return bindedCode
    },
    // 선택한 식재료 리스트 보내기 (식재료 가격이 예산보다 높으면 확인창 뜸)
    submitItemList () {
      if (this.totalCost > this.budget) {
        if (confirm('선택한 식재료의 총 가격이 설정한 예산보다 많습니다. 계속 진행하시겠습니까?')) {
          this.codeSplit()
          this.$axios.post('http://localhost:3000/ingredient/userlist', this.finalCodeList, { withCredentials: true })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
          // location.href = '/mealplan/step4'
        } else {
          alert('예산과 식재료를 다시 한번 확인해주세요.')
        }
      } else {
        this.codeSplit()
        this.$axios.post('http://localhost:3000/ingredient/userlist', this.finalCodeList, { withCredentials: true })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        // location.href = '/mealplan/step4'
      }
    },
    codeSplit () {
      for (var i = 0; i < this.checkedItemCode.length; i++) {
        this.subCodeList.push(this.checkedItemCode[i].split('-'))
        var obj = {
          itemCode: this.subCodeList[i][0],
          detailItemCode: this.subCodeList[i][1],
          price: this.subCodeList[i][2]
        }
        this.finalCodeList.push(obj)
      }
      console.log(this.finalCodeList)
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
  }
  .btn-warning {
    color:black
  }
  #progress {
    appearance: none;
    width: 93%;
    height: 30px;
    float: left;
  }
  #progress::-webkit-progress-bar {
    background:#f0f0f0;
    border-radius:10px;
    box-shadow: inset 3px 3px 10px #ccc;
  }
  #progress::-webkit-progress-value {
    border-radius:10px;
    background: #138127;
    background: -webkit-linear-gradient(to right, #d7d000, #699900);
    background: linear-gradient(to right, #d7d000, #699900);
  }
</style>
