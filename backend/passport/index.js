const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/User');
const kakao = require('./kakaoStrategy');

module.exports = () => {
    passport.serializeUser((user, done) => { //로그인 시 실행
      done(null, user.email); 
      //첫번째 인자는 에러 발생시 사용, 저장하고 싶은 데이터
    });
    passport.deserializeUser((email, done) => {  
      //매 요청마다 실행, passport 미들웨어가 메소드 호출 serialize done 두번째 인수를 갖다씀
        User.findOne({
          where: { email },
        })
          .then(user => done(null, user)) // req.user에 저장 하는 것
          .catch(err => done(err));
      });
    
      local();
      kakao();
};