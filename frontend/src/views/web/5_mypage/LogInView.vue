<template>
  <section class="vh-100">
    <div class="container h-100" style="margin-top: 30px;">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px; margin-bottom: 20px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>
                  <form id="login-form" @submit.prevent="submitForm" class="mx-1 mx-md-4">
                    <div>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0 input_row">
                          <label class="form-label" for="id">이메일</label>
                          <div>
                            <input type="text" id="email" class="form-control" style="display:inline-block;" placeholder="Email" v-model="user.email" required autofocus/>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0 input_row">
                          <label class="form-label" for="password">비밀번호</label>
                          <input type="password" id="password" class="form-control" placeholder="Password" v-model="user.password" required/>
                        </div>
                      </div>
                      <div class="ms-3">
                        <div class="d-flex justify-content-center">
                          <a href="/"><button type="submit" class="btn btn-primary btn-lg btn-custom" style="margin-left:10px">로그인</button></a>
                          <a href="/user/signup" class="btn btn-primary btn-lg btn-custom">회원가입</a>
                        </div>
                        <!-- 카카오 로그인 추후 지원 예정 -->
                        <!-- <div class="d-flex justify-content-center mb-3 mb-lg-4">
                          <a class="btn" @click="kakaoLogin()"><img src="@/assets/kakao_login_large_wide.png" height="50px"></a>
                        </div> -->
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  class="img-fluid" style="border-radius:20px;">
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
/* eslint-disable */
export default {
  components: {},
  data: function () {
  return {
    user: {
      email: null,
      password: null
    },
    mobile: false
  }
},
  setup() {},
  created() {
    this.mobileCheck()
  },
  mounted () {},
  unmounted() {},
  methods: {
    async submitForm () {
      try {
        const userData = {
          email: this.user.email,
          password: this.user.password,
        }
        const url = 'http://localhost:3000/user/login'
        const res = await this.$axios.post(url,userData,{ withCredentials: true })
        if(res.data.user){  
          location.href='/'
        }else if(res.data){
          alert(res.data);
        }        
      } catch (err) {
        alert('다시 시도해주세요')
      }
    },
    mobileCheck () {
      if (window.innerWidth <= 600) {
        this.mobile = true
        console.log('mobile')
        location.href = 'login/m'
      }      
    }
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
.btn-custom {
  margin-left: 0px;
  width:161px;
  height: 50px;
  border-radius: 7px;
  font-size: 1.1rem;
  padding: 11px
}
</style>
