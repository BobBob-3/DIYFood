const express = require('express');
const app = express();
const router = express.Router();
const pbkdf2 = require('crypto');

const connection = require('../mysql/mysql_connection');

//middleware connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post('/signup', async function(req, res) {
  const param= [req.body.email,req.body.password,req.body.name,req.body.reg_date];

  try{
    await userInfoInsert(param[0],param[1],param[2],param[3]);
    res.send('유저 정보 삽입 성공');
  }catch(err){
    console.log(err);
    res.send('에러 발생');
  }
});

const userInfoInsert = async(email, password, name, reg_date) =>{
  const userInsertQuery = 'insert into user(`email`,`password`,`name`,`reg_date`) values (?,?,?,?)';
  
  const randomSalt = pbkdf2.randomBytes(32).toString("hex");
  const cryptedPassword = pbkdf2.pbkdf2Sync(password, randomSalt, 65536, 64,"sha512").toString('hex');
  const passwordWithSalt = cryptedPassword + "$" + randomSalt;
  console.log(passwordWithSalt);
  await connection.query(userInsertQuery, [email, passwordWithSalt, name,reg_date] );
};

//비밀번호 대조
const userPasswordVerify = async (givenPassword , encryptedPasswordWithSalt)=>{
  const [encrypted , salt] = encryptedPasswordWithSalt.split("$");
  const givenEncrypted = pbkdf2.pbkdf2Sync(givenPassword, salt, 65536, 64, "sha512").toString("hex");
  if(givenEncrypted === encrypted){
    return 1;
  }else{
    return 0;
  }
}

//중복값을 확인하여 t/f 반환 
router.post('/checkemail', function(req, res) {
  connection.connect();
  const email= req.body.email;
  connection.query('select email from user where email=?', email, (error, rows,fields) => {
    let checkEmail = false;
    if(rows.length == 0){
      checkEmail = true;
    }
    
    res.send(checkEmail);
    
  });
});

/*
passport.use(
  new LocalStrategy(
    {
      emailField: "email",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    async function (email, password, done) {
      console.log(email, password);
      try {
        const result = await user.findOne({
          where: { email: email, password: password },
        });
        if (!result)
          return done(null, false, { message: "존재하지않는 아이디요" });
        if (email == result.password) {
          return done(null, result);
        } else {
          return done(null, false, { message: "비번틀렸어요" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeUser ", user);
  done(null, user.user_id);
});

passport.deserializeUser(async function (id, done) {
  console.log("deserializeUser id ", id);
  var userinfo = await user.findOne({
    where: { user_id: id },
  });
  done(null, userinfo);
});

function checkLogin(req, res, next) {
  if (req.user) {
    console.log("login checked");
    next();
  } else {
    console.log("login first");
    res.send("로그인 안하셨는데요?");
  }
}
router.get('/logout', (req, res) => {
    res.send('This is logout page');
});
router.post("/signup", async(req, res)=>{
  const {emial, password, name}=req.body;

  try{
      //간단한 에러 핸들링. username이 중복된 요청이 들어온다든가 하는 경우 에러가 발생함
      const result=await userInfoInsert(username, password);
      res.send("유저 정보 삽입 성공");
  }
  catch(err){
      res.send("에러 발생");
  }
});
*/
module.exports = router;