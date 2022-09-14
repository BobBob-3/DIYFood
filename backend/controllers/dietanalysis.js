const express = require('express');
const { sequelize } = require('../models');
const router = express.Router();
const { Op } = require("sequelize");
const models = require('../models');
const bodyParser = require('body-parser');

const dietanalysis = {
    getUserInfo : async (req, res, done) => {
        try{
            const userId = res.locals.user.id;
            const existUserInfo = await models.UserInfo.findOne({
                
                where : {
                    userId : userId// 아이디, 날짜
                }
            })
            if(existUserInfo){
            const resultInfo = {
                gender : existUserInfo.dataValues.gender,
                age : existUserInfo.dataValues.age,
                weight : existUserInfo.dataValues.weight,
                height : existUserInfo.dataValues.height,
                purpose : existUserInfo.dataValues.purpose,
                activeMass : existUserInfo.dataValues.activeMass,
            }
            res.send(resultInfo)
            }else{
                console.log('X')
            }
        }catch(error){
            console.error(error);
        }
    },
    setUserInfo : async (req, res) => {
        try{
        const userId = res.locals.user.id;
        // userinfo에 정보 있는지 확인
        const myId = await models.UserInfo.findOne({
            attribute : ['userId'],
            where :{
                userId : userId
            }
            
        })
        console.log(myId);
        if(myId !== null){
            await models.UserInfo.update({
                'gender' : req.body.gender,
                'age' : req.body.age,
                'weight' : req.body.weight,
                'height' : req.body.height,
                'purpose' : req.body.purpose,
                'activeMass' : req.body.activeMass,
            },
            {where : {userId : userId}}
            )
            res.send('유저 정보 업데이트 완료');
        }else{
            await models.UserInfo.create({
                'gender' : req.body.gender,
                'age' : req.body.age,
                'weight' : req.body.weight,
                'height' : req.body.height,
                'purpose' : req.body.purpose,
                'activeMass' : req.body.activeMass,
                'userId' : res.locals.user.id,
            })
            res.send('유저 정보 저장완료');
        }

        }catch(error){
            console.error(error);
        }
    },

    getUserRecipeAnalysis : async (req, res) => {
        const date = req.query.date;
        const userId = res.locals.user.id;
        // 유저가 섭취한 음식을 받아옴 // 날짜정보도 같이 조회
        const userSelectFood = await models.UserRecipe.findAll({
            attribute : ['foodCode'],
            where : {
                [Op.and]: [{userId : userId} , {date : date}], // 아이디, 날짜
            }
        })
        let count = [];
        let totalNutrient = [];
        let sumEnergy = 0;
        let sumCarbohydrate =0;
        let sumProtein =0;
        let sumFat =0;
        let sumNatrium =0;
        console.log(userSelectFood[0].dataValues)
        for(const item in userSelectFood){
            
            count.push(userSelectFood[item].dataValues.foodCode);
        }
        
        console.log(count)
        const selectFoodNutrient = await models.RecipeNutrient.findAll({
            attribute : ['foodCode'],
            where : {foodCode : count}
        })
        console.log(selectFoodNutrient[1].dataValues)
        for(const item in selectFoodNutrient){
            sumEnergy += selectFoodNutrient[item].dataValues.foodEnergy;
            sumCarbohydrate += selectFoodNutrient[item].dataValues.foodCarbohydrate;
            sumProtein += selectFoodNutrient[item].dataValues.foodProtein;
            sumFat += selectFoodNutrient[item].dataValues.foodFat;
            sumNatrium += selectFoodNutrient[item].dataValues.foodNatrium;
        }
        totalNutrient.push(sumEnergy,sumCarbohydrate,sumProtein,sumFat,sumNatrium);
        
        console.log(totalNutrient)
        const userInformation = await models.UserInfo.findOne({
            attribute : ['userId'],
            where : {
                userId : userId// 아이디, 날짜
            }
        })
        let BasicMetabolicRate = 0;
        let maintain_calorie = 0;
        let activeMass = 0;
        let dailyNeedEnergy = 0;
        if ( userInformation.dataValues.activeMass == 0){
            activeMass = 1.2
        } 
        else if(  userInformation.dataValues.activeMass == 1){
            activeMass = 1.375
        }
        else if( userInformation.dataValues.activeMass == 2){
            activeMass = 1.55
        }
        else if(  userInformation.dataValues.activeMass == 3){
            activeMass = 1.725
        }
        else if(  userInformation.dataValues.activeMass == 4){
            activeMass = 1.9
        }
        let purpose = 0;
        if ( userInformation.dataValues.purpose == 0){
            purpose = 1.1
        }
        else if ( userInformation.dataValues.purpose == 1){
            purpose = 1
        }
        else if ( userInformation.dataValues.purpose == 2){
            purpose = 0.9
        }
        if (userInformation.dataValues.gender == 'male'){
            BasicMetabolicRate = 66 + (13.7 * userInformation.dataValues.weight) +(5 * userInformation.dataValues.height) - (6.8 * userInformation.dataValues.age);
            maintain_calorie = BasicMetabolicRate * activeMass //
            dailyNeedEnergy = maintain_calorie * purpose
        } else {
            BasicMetabolicRate = 655 + (9.6 * userInformation.dataValues.weight) + (1.7 * userInformation.dataValues.height) - (4.7 * userInformation.dataValues.age);
            maintain_calorie = BasicMetabolicRate * activeMass //
            dailyNeedEnergy = maintain_calorie * purpose
        }
        console.log(userInformation.dataValues.age)
        console.log(dailyNeedEnergy)
        console.log(sumProtein)
        // 탄수화물 50퍼, 단백질 30퍼 , 지방 20퍼
        let dailyNeedProtein = userInformation.dataValues.weight
        let dailyNeedCarbohydrate = 120
        let dailyNeedFat = 50
        let dailyNeedNatrium = 2000
        let daily3rdNutrientTotal = sumCarbohydrate + sumProtein + sumFat
        let percentCarbohydrate = sumCarbohydrate / daily3rdNutrientTotal *100
        let percentProtein = sumProtein / daily3rdNutrientTotal * 100
        let percentFat = sumFat / daily3rdNutrientTotal * 100
        console.log(percentCarbohydrate)
        const result = {
            BasicMetabolicRate :BasicMetabolicRate,
            maintain_calorie : maintain_calorie,
            dailyNeedEnergy : dailyNeedEnergy,
            dailyNeedProtein : dailyNeedProtein,
            dailyNeedNatrium : dailyNeedNatrium,
            dailyNeedCarbohydrate : dailyNeedCarbohydrate,
            dailyNeedFat : dailyNeedFat,
            sumEnergy : sumEnergy,
            sumCarbohydrate : sumCarbohydrate,
            sumProtein : sumProtein,
            sumFat : sumFat,
            sumNatrium : sumNatrium,
            percentCarbohydrate : percentCarbohydrate,
            percentProtein : percentProtein,
            percentFat : percentFat
            
        }
        
        res.send(result)
        
    },
};

module.exports = dietanalysis;