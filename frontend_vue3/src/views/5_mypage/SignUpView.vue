<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px; margin-bottom: 20px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">                      
                      <label class="form-label" for="SignUpForm">이름</label>
                      <input type="text" id="name" class="form-control" placeholder="Name"/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="SignUpForm">이메일</label>
                      <input type="email" id="email" class="form-control" placeholder="Email"/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="SignUpForm">비밀번호</label>
                      <input type="password" id="password" class="form-control" placeholder="Password"/>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="SignUpForm">비밀번호 확인</label>
                      <input type="password" id="password" class="form-control" placeholder="Password Repeat"/>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="agreement" />
                    <label class="form-check-label" for="agreement">
                      <a href="#!">이용약관 및 개인정보 수집 및 이용</a> 안내에 동의합니다.
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  class="img-fluid" alt="Sample image" style="width: 90%; border-radius:20px;">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
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
