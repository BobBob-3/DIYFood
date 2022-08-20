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
                  <div id="page">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="id">이메일</label>
                        <div>
                          <input type="email" id="id" class="form-control" style="width:75%; display:inline-block;" placeholder="Email" v-model="user.userid" required />
                          <input type="button" class="btn btn-primary" value="중복확인" style="float:right; margin: 0px;" required>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">                      
                        <label class="form-label" for="name">이름</label>
                        <input type="text" id="name" class="form-control" placeholder="Name" v-model="user.name" required/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="password">비밀번호</label>
                        <input type="password" id="password" class="form-control" placeholder="Password" v-model="user.password" required/>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="password1">비밀번호 확인</label>
                        <input type="password" id="password1" class="form-control" placeholder="Password Repeat" v-model="user.password1" required/>
                      </div>
                    </div>
                    <div class="form-check d-flex justify-content-center mb-5">
                      <input class="form-check-input me-2" type="checkbox" value="" id="agreement" required/>
                      <label class="form-check-label" for="agreement">
                        <a href="#!">이용약관 및 개인정보 수집 및 이용</a> 안내에 동의합니다.
                      </label>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button class="btn btn-primary btn-lg" @click="[passwordConfirm(), signUp()]">가입하기</button>
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
export default {
  components: {},
  data: function () {
  return {
    nowDate:'',
    user: {
      userid: '',
      name: '',
      password: '',
      password1: '',
    }
  }
},
  setup() {},
  created() {},
  mounted () {
    this.timer = setInterval(() => {    
    this.setNowTimes()
    this.passwordConfirm
  },1000)},
  unmounted() {},
  methods: {
  passwordConfirm: function() {
    if(this.user.password != this.user.password1) {
      alert("비밀번호가 일치하지 않습니다.")
    }
  },

  signUp: function () {
    this.$http.post('/user/signup', { 
      user: this.user,
      signUpDate: this.nowDate
    })
    .then((res) => {
      if (res.data.success == true) {
        alert(res.data.message);
        this.$router.push('/login') 
      }
      if (res.data.success == false) {
        alert(res.data.message);
      }
    })
    .catch(function () {
      alert('error')
    })
  },

  setNowTimes() {
    let myDate = new Date() 
    let yy = String(myDate.getFullYear())  
    let mm = myDate.getMonth() + 1  
    let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
    this.nowDate = yy + '-' + mm + '-' + dd
  }
}
}
</script>
