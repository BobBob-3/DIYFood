const express = require('express');
const router = express.Router();

const ingredient = require('./ingredient');
const user = require('./user')
const recipe = require('./recipe')
const dietanalysis = require('./dietanalysis');

//해당 라우터 모든 요청에 대해 값 집어넣기
router.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
})

router.get('/' ,(req,res,next) =>{
    res.send('hi');
})

router.use('/user', user);
router.use('/ingredient',ingredient);
router.use('/recipe', recipe);
router.use('/dietanalysis', dietanalysis);


module.exports = router;
