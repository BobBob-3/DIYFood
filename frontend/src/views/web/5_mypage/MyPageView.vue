<template>
  <body id="page" style="text-align: center;">
    <div style="margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MY PAGE
      </p>
      <p style="font-size:1.5em"><b>{{username}}</b> 님 환영합니다!</p>
    </div>
    <div style="display: inline-block; margin: 0 200px;">
      <a href="/user/info/">
        <section class="content-box-4">
          <img src="https://cdn-icons-png.flaticon.com/512/6082/6082867.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">회원정보 수정</h4>
          </div>
        </section>
      </a>
      <a href="/user/mymealplan">
        <section class="content-box-4">
          <img src="https://cdn-icons-png.flaticon.com/512/5223/5223850.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">나의 식단 계획</h4>
          </div>
        </section>
      </a>
      <a href="/user/registerfood">
        <section class="content-box-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2515/2515263.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">나의 식단 등록</h4>
          </div>
        </section>
      </a>
      <a href="/analysis/survey">
        <section class="content-box-4">
          <img src="https://cdn-icons-png.flaticon.com/512/1162/1162489.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">나의 식단 분석</h4>
          </div>
        </section>
      </a>
    </div>
    <div style="display: inline-block;">
      <a href="/user/signout">
        <input type="button" class="btn btn-lg next-button" value="회원 탈퇴" style="color:dimgrey">
      </a>
    </div>
  </body>
</template>
<script>
/* eslint-disable */

export default {
  components: {},
  data () {
    return {
      username: ''
    }
  },
  setup () {},
  created () {
    this.getUserInfo()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 사용자 정보 가져오기
    async getUserInfo () {
      try{
        const url = 'http://localhost:3000/user/info'
        const res = await this.$axios.get(url, { withCredentials: true })
        this.username = res.data.name
      } catch(err){
        console.log(err)
        alert('사용자 정보를 불러올 수 없습니다')
        location.href = '/user/login'
      }
    },
    // 식품 목록 불러오기
    async getFoodData () {
      try {
        const response = await this.$axios.get('http://localhost:3000/ingredient/userlist', { withCredentials: true })
        this.itemList = response.data
        this.metaItemList = response.data
        this.itemList = this.metaItemList.filter(
          (item) => parseInt(item.itemCode / 100) === 1
        )
      } catch (err) {
        location.reload()
      }
    },
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
.content-box-4{
  float: left;
  width: 23%;
  background-color:white;
  margin: 1%;
  margin-bottom: 10px;
  margin-top:10px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding-top: 30px;
  padding-bottom: 30px;
}
.content-box-3{
  float: left;
  width: 27%;
  background-color:white;
  margin: 3%;
  margin-bottom: 10px;
  margin-top:10px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding-top: 30px;
  padding-bottom: 30px;
}
.img_style {
  width: 60%;
  text-align: center;
  margin-top: 30px;
}
.next-button {
  height: 50px;
  width: 150px;
  border-radius: 10px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  margin: 20px;
  background-color: #ffffff;
  float: left;
}
.next-button:hover {
  background-color: #f3f3f3;
}
.next-button:focus {
  background-color: #f3f3f3;
}
</style>
