const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');


module.exports = () => {
    passport.use(
        new LocalStrategy(
            //verify callback
            (username, password, done)=>{
                const result=userList.filter((user)=>user.username===username);
    
                if(result.length>0){
                    const user=result[0];
                    if(user.password===password){
                        return done(null, user);
                    }
                    else{
                        return done(null, false, {message:"틀린 비밀번호입니다"});
                    }
                }
                else{
                    return done(null, false, {message:"존재하지 않는 유저입니다"});
                }
            }
        )
    );
  };