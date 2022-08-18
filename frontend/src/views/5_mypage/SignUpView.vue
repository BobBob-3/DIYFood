<template>
<body id="page">
  <!-- Head -->
  <div style="margin: 20px; text-align: center;" id="head">
    <p style="font-size:4em; font-weight:500;">
      SIGN UP
    </p>
    <p style="font-size:1.5em; font-weight:400;">
      회원가입
    </p>
  </div>
  <!-- Body -->
  <div id="content-box">
    <form action="SignUpForm" method="post">
      <div class="sector">
        <p><label for="email">이메일</label></p>
        <p><input class="input_box" type="text" id="email" placeholder=" E-mail" v-model="email" /></p>
      </div>
      <div class="sector">
        <p><label for="name">이름</label></p>
        <p><input class="input_box" type="text" id="name" placeholder=" Name" v-model="name" /></p>
      </div>
      <div class="sector">
        <p><label for="password">비밀번호</label></p>
        <p><input class="input_box" type="password" id="password" placeholder=" Password" v-model="password" /></p>
      </div>
      <div class="sector">
        <p><label for="passwordConfirm">비밀번호 확인</label></p>
        <p><input class="input_box" type="password" id="passwordConfirm" placeholder=" Password" v-model="passwordConfirm" /></p>
      </div>
    </form>
  </div>
</body>

</template>
<script>
export default {
  name: 'SignUpForm',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirm: ''
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
  .sector {
    margin-top: 10px;
    font-weight:500;
  }
  #content-box{
  width: fit-content;
  height: fit-content;
  background-color:white;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding: 30px;
  }
  #head {
  width:auto;
  height: fit-content;
  }
</style>
