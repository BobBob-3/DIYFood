<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <span style="font-size:4em; font-weight:500; line-height:70px;">
        DIET ANALYSIS
      </span>
      <span style="font-size:1.5em; font-weight:400;">
        {{username}}님의 식단 계획 데이터를 기반으로 영양 섭취를 분석합니다.
      </span>
    </div>
    <div class="content-box">
      <!-- <form> -->
        <div class="half-box">
          <div style="text-align: center; margin-top: 20%;">
            <img src="https://cdn-icons-png.flaticon.com/512/668/668709.png" width="50%">
            <h1 style="margin-top: 50px">나의 정보</h1>
          </div>
        </div>
        <div class="half-box">
          <div>
            <span><b>성별</b></span>
            <label>
              <input type="radio" class="form-check-input margin-left" name="gender" value="male" v-model="userdata.gender" required> 남성
              <input type="radio" class="form-check-input margin-left" name="gender" value="female" v-model="userdata.gender" required> 여성
            </label>
          </div>
          <p></p>
          <div>
            <span><b>나이</b></span>
            <input type="number" class="margin-left" min="1" max="100" v-model="userdata.age" required>
            <span> 세</span>
          </div>
          <p></p>
          <div>
            <span><b>신장</b></span>
            <input type="number" class="margin-left" min="1" max="300" v-model="userdata.height" required>
            <span> cm</span>
          </div>
          <p></p>
          <div>
            <span><b>체중</b></span>
            <input type="number" class="margin-left" min="1" max="200" v-model="userdata.weight" required>
            <span> kg</span>
          </div>
          <p></p>
          <div>
            <span><b>목표</b></span>
            <label>
              <input type="radio" class="form-check-input margin-left" name="purpose" value="0" v-model="userdata.purpose" required> 벌크업
            </label>
            <label>
              <input type="radio" class="form-check-input margin-left" name="purpose" value="1" v-model="userdata.purpose" required> 유지
            </label>
            <label>
              <input type="radio" class="form-check-input margin-left" name="purpose" value="2" v-model="userdata.purpose" required> 다이어트
            </label>
          </div>
          <p></p>
          <div>
            <span><b>활동량</b></span><br>
            <label style="margin-top:10px">
              <input type="radio" class="form-check-input margin-left" name="activeMass" value="0" v-model="userdata.activeMass" required> 거의 없다 (운동 안함)
            </label><br>
            <label>
              <input type="radio" class="form-check-input margin-left" name="activeMass" value="1" v-model="userdata.activeMass" required> 조금 있다 (주 1-2회 운동)
            </label><br>
            <label>
              <input type="radio" class="form-check-input margin-left" name="activeMass" value="2" v-model="userdata.activeMass" required> 보통이다 (주 3-4회 운동)
            </label><br>
            <label>
              <input type="radio" class="form-check-input margin-left" name="activeMass" value="3" v-model="userdata.activeMass" required> 꽤 있다 (주 5-6회 운동)
            </label><br>
            <label>
              <input type="radio" class="form-check-input margin-left" name="activeMass" value="4" v-model="userdata.activeMass" required> 매우 활동적이다 (매일 운동)
            </label>
          </div>
        </div>
        <div class="agreement-box">
          <p>수집된 개인정보는 식단 분석을 위한 1일 권장 영양소 섭취량 계산에 사용됩니다.</p>
          <input class="form-check-input" type="checkbox" id="agreement" required/>
          <label class="form-check-label" style="margin-left: 10px" for="agreement" required>
            <b>개인정보 수집 및 이용 안내</b>에 동의합니다.
          </label>
        </div>
        <div style="text-align:center;" >
          <button class="btn btn-primary btn-lg next-button btn-custom" @click="submitForm()">NEXT</button>
        </div>
      <!-- </form> -->
    </div>
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
      username: '',
      userid: '',
      userdata: {
        gender: '',
        age: '',
        height: '',
        weight: '',
        purpose:'',
        activeMass: ''
      },
      surveyData: []
    }
  },
  setup () {},
  computed: {
    cookie () {
      return document.cookie
    }
  },
  created () {
    this.start()
    this.getUserInfo()
    this.getUserSurveyData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 사용자 정보 가져오기
    getUserInfo () {
      const url = 'http://localhost:3000/user/info'
      this.$axios.get(url, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.username = res.data.name
            this.userid = res.data.id
          } else if (res.data.message) {
            alert(res.data.message)
          }
        })
    },
    getUserSurveyData () {
      const url = 'http://localhost:3000/dietanalysis/analysis'
      this.$axios.get(url, { withCredentials: true })
      .then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.surveyData = response.data
        console.log(this.surveyData)
      }).catch(error => {
        console.log(error)
      })
    },
    start () {
      if (this.cookie) {
        // pass
      } else {
        alert('로그인이 필요한 기능입니다.')
        location.href = '/user/login'
      }
    },
    submitForm () {
      this.$axios.post(`http://localhost:3000/dietanalysis/analysis?:${this.userid}`, this.userdata, { withCredentials: true })
        .then(function (response) {
          console.log(response)
          // location.href = '/analysis/result'
        })
        .catch(function (error) {
          console.log(error)
        })
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
  text-align: left;
  overflow: auto;
}
.btn-custom {
  margin-bottom: 30px;
}
.half-box {
  width: 50%;
  height: 700px;
  padding: 50px;
  display: inline-block;
  float: left;
  font-size: 1.3rem;
  font-weight: 500;
  vertical-align: middle;
}
.agreement-box {
  width:100%;
  text-align: center;
  display: inline-block;
  font-size: 1.3rem;
}
.margin-left {
  margin-left: 10px;
  margin-bottom:20px;
}
</style>
