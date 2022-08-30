<template>
  <body id="page" style="text-align: center;">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MY PAGE
      </p>
      <p style="font-size:1.5em">______님 환영합니다!</p>
    </div>
    <div style="display: inline-block;">
      <a href="/user/myinfo/update">
        <section id="content-box" style="margin-left:50px">
          <img src="https://cdn-icons-png.flaticon.com/512/668/668709.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">회원정보 수정</h4>
          </div>
        </section>
      </a>
      <a href="">
        <section id="content-box" style="margin-left:50px">
          <img src="https://cdn-icons-png.flaticon.com/512/735/735742.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">나의 식단 계획</h4>
          </div>
        </section>
      </a>
      <a href="">
        <section id="content-box" style="margin-left:50px">
          <img src="https://cdn-icons-png.flaticon.com/512/2041/2041643.png" alt="" class="img_style">
          <div style="margin-top:30px;">
            <h4 style="color:black">나의 식단 분석</h4>
          </div>
        </section>
      </a>
    </div>
    <div style="text-align:center;" >
      <a href="">
        <input type="button" class="btn btn-lg next-button text-uppercase" value="로그아웃">
      </a>
    </div>
    <div style="text-align:center;" >
      <a href="">
        <input type="button" class="btn btn-lg next-button text-uppercase" value="회원 탈퇴">
      </a>
    </div>
  </body>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: ''
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
body{background: #f3f3f3;}
#content-box{
  float: left;
  width: 300px;
  height: 400px;
  background-color:white;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 0px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding-top: 30px;
  padding-bottom: 10px;
}
.img_style {
  height: 200px;
  width: 200px;
  text-align: center;
  margin-top: 30px;
}
.next-button {
  height: 50px;
  width: 150px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px lightgray;
  margin: 30px;
  border: none;
  background-color: #ffffff;
}
</style>
