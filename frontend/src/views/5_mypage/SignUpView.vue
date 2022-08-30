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
                <form name="SignUpForm" class="mx-1 mx-md-4" @submit.prevent="submitForm">
                  <div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="id">이메일</label>
                        <div>
                          <input type="email" class="form-control" style="width:75%; display:inline-block;" placeholder="Email" v-model="user.email" required />
                          <input type="button" class="btn btn-primary" value="중복확인" style="float:right; margin: 0px;" @click="IdCheck" required>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="name">이름</label>
                        <input type="text" id="user.name" class="form-control" placeholder="Name" v-model="user.name" required/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="password">비밀번호</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="user.password" required/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="password1">비밀번호 확인</label>
                        <input type="password" class="form-control" placeholder="Password Repeat" v-model="user.password1" @blur="passwordConfirm()" required/>
                      </div>
                    </div>
                    <div class="form-check d-flex justify-content-center mb-5">
                      <input class="form-check-input me-2" type="checkbox" id="agreement" required/>
                      <label class="form-check-label" for="agreement">
                        <a href="#!">이용약관 및 개인정보 수집 및 이용</a> 안내에 동의합니다.
                      </label>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" class="btn btn-primary btn-lg">가입하기</button>
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
        email: '',
        name: '',
        password: '',
      },
      idcheck_code: 0
    }
  },
  setup () {},
  created () {},
  mounted () {
  },
  unmounted () {},
  methods: {
    // 회원가입 submit
    async submitForm(){
      if (this.idcheck_code===1) {
        // API 요청시 전달할 userData 객체
        const userData = {
          email: this.user.email,
          password: this.user.password,
          name: this.user.name,
        }
        const url = 'http://localhost:3000/user/signup'
        const headers = { 'Content-Type':'application/json'};
        await this.$axios.post(url,userData);       
        location.href = '/user/signupcompleted'; 
      } else {
        alert('이메일 중복을 확인해주세요')
      }
      
    },
    // 비밀번호 확인
    passwordConfirm(){
      if(this.user.password != this.user.password1) {
        alert("비밀번호가 일치하지 않습니다.")
      }
    },
    // 아이디 중복확인
    async IdCheck(){
      
      console.log('SignUpView.vue => IdCheck');
      console.log('SignUpView.vue => IdCheck', this.user.email);

      const url = `http://localhost:3000/user/checkemail?email=${this.user.email}`;
      const headers = {"Content-Type":"application/json"};
      const response = await this.$axios.get(url);
      console.log(response);

      if(response.data === 0){
          alert('중복된 아이디가 존재합니다.')
          return false;
      }
      if(response.data === 1){
          alert('사용가능한 아이디입니다')
          this.idcheck_code=1
      }    
    }
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
</style>
