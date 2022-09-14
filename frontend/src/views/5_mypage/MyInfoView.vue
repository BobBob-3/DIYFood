<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px; margin-bottom: 20px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">My Info</p>
                <form class="mx-1 mx-md-4" @submit.prevent="submitForm">
                  <div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="id">이메일</label>
                        <div>
                          <input type="email" id="email" class="form-control" style="display:inline-block;" v-model="user.email" readonly/>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0 input_row">
                        <label class="form-label" for="name">이름 <span style="color:red">{{namecheck_msg}}</span></label>
                        <input type="text" id="name" class="form-control" placeholder="Name" v-model="user.name" @blur="characterCheck(user.name)" required/>
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
                        <input type="password" id="password1" class="form-control" placeholder="Password Repeat" v-model="user.password1" @blur="passwordConfirm()" required/>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" class="btn btn-primary btn-lg">회원정보 수정</button>
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
      password: ''
    },
    namecheck_code: 0,
    namecheck_msg: ''
  }
},
  setup() {},
  created() {
    this.getUserInfo()
  },
  mounted () {
    this.passwordConfirm
  },
  unmounted() {},
  methods: {
    getUserInfo () {
      const url = 'http://localhost:3000/user/info'
      this.$axios.get(url, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.user.email = res.data.email
            this.user.name = res.data.name
          } else if (res.data.message) {
            alert(res.data.message)
          }
        })
    },
    // user info modify submit
    submitForm(){
      if (this.namecheck_code===1) {
        // API 요청시 전달할 userData 객체
        const userData = {
          email: this.user.email,
          password: this.user.password,
          name: this.user.name,
        };
        const url = 'http://localhost:3000/user/info';
        this.$axios.patch(url, userData, { withCredentials: true })
        .then((res)=> {
          console.log(res);
          if(res.data===0){
            alert("회원정보가 수정되었습니다.")
          }else{
            alert("다시 시도해주세요");
          }
        })
      }
      else {
        alert('이름에 특수문자는 입력할 수 없습니다.')
      }
    },
    //비밀번호 확인
    passwordConfirm(){
      if(this.user.password != this.user.password1) {
        alert("비밀번호가 일치하지 않습니다.")
      }
    },
    characterCheck (str) {
      var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
      //특수문자 검증
      if(reg.test(str)){
        alert('이름에 특수문자는 입력할 수 없습니다.')
        this.namecheck_msg = '특수문자는 입력할 수 없습니다.'
        //특수문자 제거후 리턴
        return str.replace(reg, "");
      } else {
        //특수문자가 없으므로 본래 문자 리턴
        this.namecheck_msg = ''
        this.namecheck_code = 1
        return str;
      }  
    }
  }
}
</script>

<style>
@import "@/css/styles.css";
body{background: #f3f3f3;}
</style>
