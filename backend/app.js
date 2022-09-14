const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/auth')
const dotenv = require('dotenv');
dotenv.config();
const createError = require('http-errors');

const cors = require('cors');

const {sequelize} = require('./models');
const passportConfig = require('./passport');
const cron = require('node-cron');

const routes = require('./routes');

const app = express();

passportConfig(); //패스포트 설정
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');   

sequelize.sync({force : false})
.then( ()=>{
  console.log("데이터베이스 연결 성공");
}).catch((err) =>{
  console.error(err);
});

const corsOption ={
  credentials: true,
  origin : 'http://localhost:8080'
}

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: true,
  cookie:{
    httpOnly: false,
    secure: false,
  },
  //store:new FileStore() // 세션 저장
  // 기본 이름 : connect.sid
}));
app.use(passport.initialize());  // req 객체에 passport 설정을 담아줌
app.use(passport.session()); //session 객체에 passport 정보를 저장

app.use('/', routes);
app.use('/auth', authRouter);

const server = require('./server');
//오후 16시마다 업데이트 (화 ~ 토) 
cron.schedule('0 16 * * 2-6', async function(){
  const data = [100,200,300,400,600];
  const d =new Date();
  const p_regday = d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
  for(let i = 0 ;i < 5; i++){
      await server.getTodayData(data[i],p_regday);
  }
    console.log("update is done!")
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
