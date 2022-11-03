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
                    userId : userId
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
        
        const selectFoodNutrient = await models.RecipeNutrient.findAll({
            attribute : ['foodCode'],
            where : {foodCode : count}
        })
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
                userId : userId
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
        
        let BMIrate = '';
        let BMI = userInformation.dataValues.weight / ((userInformation.dataValues.height/100) * (userInformation.dataValues.height/100))
        console.log(BMI)
        if (BMI < 18.5){
            BMIrate = '저체중'
        }
        else if ( 18.5<= BMI < 23 ){
            BMIrate = '정상'
        }
        else if ( 23 <= BMI < 25){
            BMIrate = '과체중'
        }
        else if (25 <= BMI < 30){
            BMIrate = '비만'
        }
        else if (BMI >= 30){
            BMIrate = '고도비만'
        }
        console.log(BMIrate)
        
        needCarbohydrate = dailyNeedCarbohydrate - sumCarbohydrate
        needProtein = dailyNeedProtein - sumProtein
        needFat = dailyNeedFat - sumFat
        console.log(needCarbohydrate)
        console.log(needProtein)
        console.log(needFat)
        let energy = 0;
        let additionalrecipe =[];
        let additionalfood = [];

        if (needCarbohydrate > needProtein){
            if (needCarbohydrate > needFat) {
                console.log(needCarbohydrate)
                TotalneedNutrition = dailyNeedCarbohydrate
                NowNutrition =  sumCarbohydrate
                need = needCarbohydrate
                const SelectRecipe = await models.RecipeNutrient.findAll({
                    // attribute : ['foodCode'],
                    where : {

                        foodCarbohydrate : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectRecipe)
                console.log(SelectRecipe.dataValues)
                for(let item in SelectRecipe){
                    additionalrecipeName = SelectRecipe[item].dataValues.foodName;
                    additionalrecipeEnergy = SelectRecipe[item].dataValues.foodEnergy;
                    additionalrecipeCarbohydrate = SelectRecipe[item].dataValues.foodCarbohydrate;
                    additionalrecipeProtein = SelectRecipe[item].dataValues.foodProtein;
                    additionalrecipeFat = SelectRecipe[item].dataValues.foodFat;
                    additionalrecipeImage = SelectRecipe[item].dataValues.foodImage;
                    additionalrecipeNatrium = SelectRecipe[item].dataValues.foodNatrium;

                    additionalrecipe.push(additionalrecipeName);
                    additionalrecipe.push(additionalrecipeEnergy);
                    additionalrecipe.push(additionalrecipeCarbohydrate);
                    additionalrecipe.push(additionalrecipeProtein);
                    additionalrecipe.push(additionalrecipeFat);
                    additionalrecipe.push(additionalrecipeImage);
                    additionalrecipe.push(additionalrecipeNatrium);
                }
                console.log(additionalrecipe)
                const SelectFood = await models.Food.findAll({

                    where : {

                        foodCarbohydrate : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectFood)
                console.log(SelectFood.dataValues)
                for(let item in SelectFood){
                    additionalfoodName = SelectFood[item].dataValues.foodName;
                    additionalfoodEnergy = SelectFood[item].dataValues.foodEnergy;
                    additionalfoodCarbohydrate = SelectFood[item].dataValues.foodCarbohydrate;
                    additionalfoodProtein = SelectFood[item].dataValues.foodProtein;
                    additionalfoodFat = SelectFood[item].dataValues.foodFat;
                    additionalfoodNatrium = SelectFood[item].dataValues.foodNatrium;

                    additionalfood.push(additionalfoodName);
                    additionalfood.push(additionalfoodEnergy);
                    additionalfood.push(additionalfoodCarbohydrate);
                    additionalfood.push(additionalfoodProtein);
                    additionalfood.push(additionalfoodFat);
                    additionalfood.push(additionalfoodNatrium);
                }
                console.log(additionalfood)

            }
            else {
                console.log(needFat)
                TotalneedNutrition = dailyNeedCarbohydrate
                NowNutrition =  sumCarbohydrate
                need = needFat
                const SelectRecipe = await models.RecipeNutrient.findAll({

                    where : {

                        foodFat : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectRecipe)
                console.log(SelectRecipe.dataValues)
                for(let item in SelectRecipe){
                    additionalrecipeName = SelectRecipe[item].dataValues.foodName;
                    additionalrecipeEnergy = SelectRecipe[item].dataValues.foodEnergy;
                    additionalrecipeCarbohydrate = SelectRecipe[item].dataValues.foodCarbohydrate;
                    additionalrecipeProtein = SelectRecipe[item].dataValues.foodProtein;
                    additionalrecipeFat = SelectRecipe[item].dataValues.foodFat;
                    additionalrecipeImage = SelectRecipe[item].dataValues.foodImage;
                    additionalrecipeNatrium = SelectRecipe[item].dataValues.foodNatrium;

                    additionalrecipe.push(additionalrecipeName);
                    additionalrecipe.push(additionalrecipeEnergy);
                    additionalrecipe.push(additionalrecipeCarbohydrate);
                    additionalrecipe.push(additionalrecipeProtein);
                    additionalrecipe.push(additionalrecipeFat);
                    additionalrecipe.push(additionalrecipeImage);
                    additionalrecipe.push(additionalrecipeNatrium);
                }
                console.log(additionalrecipe)
                const SelectFood = await models.Food.findAll({

                    where : {

                        foodFat : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectFood)
                console.log(SelectFood.dataValues)
                for(let item in SelectFood){
                    additionalfoodName = SelectFood[item].dataValues.foodName;
                    additionalfoodEnergy = SelectFood[item].dataValues.foodEnergy;
                    additionalfoodCarbohydrate = SelectFood[item].dataValues.foodCarbohydrate;
                    additionalfoodProtein = SelectFood[item].dataValues.foodProtein;
                    additionalfoodFat = SelectFood[item].dataValues.foodFat;
                    additionalfoodNatrium = SelectFood[item].dataValues.foodNatrium;

                    additionalfood.push(additionalfoodName);
                    additionalfood.push(additionalfoodEnergy);
                    additionalfood.push(additionalfoodCarbohydrate);
                    additionalfood.push(additionalfoodProtein);
                    additionalfood.push(additionalfoodFat);
                    additionalfood.push(additionalfoodNatrium);
                }
                console.log(additionalfood)
            }
        }
        else {
            if (needProtein > needFat) {
                console.log(needProtein)
                TotalneedNutrition = dailyNeedCarbohydrate
                NowNutrition =  sumCarbohydrate
                need = needProtein
                const SelectRecipe = await models.RecipeNutrient.findAll({

                    where : {

                        foodProtein : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectRecipe)
                console.log(SelectRecipe.dataValues)
                for(let item in SelectRecipe){
                    additionalrecipeName = SelectRecipe[item].dataValues.foodName;
                    additionalrecipeEnergy = SelectRecipe[item].dataValues.foodEnergy;
                    additionalrecipeCarbohydrate = SelectRecipe[item].dataValues.foodCarbohydrate;
                    additionalrecipeProtein = SelectRecipe[item].dataValues.foodProtein;
                    additionalrecipeFat = SelectRecipe[item].dataValues.foodFat;
                    additionalrecipeImage = SelectRecipe[item].dataValues.foodImage;
                    additionalrecipeNatrium = SelectRecipe[item].dataValues.foodNatrium;

                    additionalrecipe.push(additionalrecipeName);
                    additionalrecipe.push(additionalrecipeEnergy);
                    additionalrecipe.push(additionalrecipeCarbohydrate);
                    additionalrecipe.push(additionalrecipeProtein);
                    additionalrecipe.push(additionalrecipeFat);
                    additionalrecipe.push(additionalrecipeImage);
                    additionalrecipe.push(additionalrecipeNatrium);
                }
                console.log(additionalrecipe)
                const SelectFood = await models.Food.findAll({

                    where : {

                        foodProtein : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectFood)
                console.log(SelectFood.dataValues)
                for(let item in SelectFood){
                    additionalfoodName = SelectFood[item].dataValues.foodName;
                    additionalfoodEnergy = SelectFood[item].dataValues.foodEnergy;
                    additionalfoodCarbohydrate = SelectFood[item].dataValues.foodCarbohydrate;
                    additionalfoodProtein = SelectFood[item].dataValues.foodProtein;
                    additionalfoodFat = SelectFood[item].dataValues.foodFat;
                    additionalfoodNatrium = SelectFood[item].dataValues.foodNatrium;

                    additionalfood.push(additionalfoodName);
                    additionalfood.push(additionalfoodEnergy);
                    additionalfood.push(additionalfoodCarbohydrate);
                    additionalfood.push(additionalfoodProtein);
                    additionalfood.push(additionalfoodFat);
                    additionalfood.push(additionalfoodNatrium);
                }
                console.log(additionalfood)
            }
            else {
                console.log(needFat)
                TotalneedNutrition = dailyNeedCarbohydrate
                NowNutrition =  sumCarbohydrate
                need = needFat
                const SelectRecipe = await models.RecipeNutrient.findAll({

                    where : {

                        foodFat : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectRecipe)
                console.log(SelectRecipe.dataValues)
                for(let item in SelectRecipe){
                    additionalrecipeName = SelectRecipe[item].dataValues.foodName;
                    additionalrecipeEnergy = SelectRecipe[item].dataValues.foodEnergy;
                    additionalrecipeCarbohydrate = SelectRecipe[item].dataValues.foodCarbohydrate;
                    additionalrecipeProtein = SelectRecipe[item].dataValues.foodProtein;
                    additionalrecipeFat = SelectRecipe[item].dataValues.foodFat;
                    additionalrecipeImage = SelectRecipe[item].dataValues.foodImage;
                    additionalrecipeNatrium = SelectRecipe[item].dataValues.foodNatrium;

                    additionalrecipe.push(additionalrecipeName);
                    additionalrecipe.push(additionalrecipeEnergy);
                    additionalrecipe.push(additionalrecipeCarbohydrate);
                    additionalrecipe.push(additionalrecipeProtein);
                    additionalrecipe.push(additionalrecipeFat);
                    additionalrecipe.push(additionalrecipeImage);
                    additionalrecipe.push(additionalrecipeNatrium);
                }
                console.log(additionalrecipe)
                const SelectFood = await models.Food.findAll({

                    where : {

                        foodFat : 
                        {[Op.and]:{
                            [Op.gte]: need-3,
                            [Op.lte]: need+3
                        }}
                    }
                })
                console.log(SelectFood)
                console.log(SelectFood.dataValues)
                for(let item in SelectFood){
                    additionalfoodName = SelectFood[item].dataValues.foodName;
                    additionalfoodEnergy = SelectFood[item].dataValues.foodEnergy;
                    additionalfoodCarbohydrate = SelectFood[item].dataValues.foodCarbohydrate;
                    additionalfoodProtein = SelectFood[item].dataValues.foodProtein;
                    additionalfoodFat = SelectFood[item].dataValues.foodFat;
                    additionalfoodNatrium = SelectFood[item].dataValues.foodNatrium;

                    additionalfood.push(additionalfoodName);
                    additionalfood.push(additionalfoodEnergy);
                    additionalfood.push(additionalfoodCarbohydrate);
                    additionalfood.push(additionalfoodProtein);
                    additionalfood.push(additionalfoodFat);
                    additionalfood.push(additionalfoodNatrium);
                }
                console.log(additionalfood)
            }
        }
        recipeitem1 = [additionalrecipe[0], additionalrecipe[1], additionalrecipe[2], additionalrecipe[3], additionalrecipe[4], additionalrecipe[5], additionalrecipe[6]]
        recipeitem2 = [additionalrecipe[7], additionalrecipe[8], additionalrecipe[9], additionalrecipe[10], additionalrecipe[11], additionalrecipe[12], additionalrecipe[13]]
        recipeitem3 = [additionalrecipe[14], additionalrecipe[15], additionalrecipe[16], additionalrecipe[17], additionalrecipe[18], additionalrecipe[19], additionalrecipe[20]]
        fooditem1 = [additionalfood[0], additionalfood[1], additionalfood[2], additionalfood[3], additionalfood[4], additionalfood[5]]
        fooditem2 = [additionalfood[6], additionalfood[7], additionalfood[8], additionalfood[9], additionalfood[10], additionalfood[11]]
        fooditem3 = [additionalfood[12], additionalfood[13], additionalfood[14], additionalfood[15], additionalfood[16], additionalfood[17]]
        fooditem4 = [additionalfood[18], additionalfood[19], additionalfood[20], additionalfood[21], additionalfood[22], additionalfood[23]]
        fooditem5 = [additionalfood[24], additionalfood[25], additionalfood[26], additionalfood[27], additionalfood[28], additionalfood[29]]


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
            percentFat : percentFat,
            BMI : BMI,
            BMIrate : BMIrate,
            

            TotalneedNutrition : TotalneedNutrition, 
            NowNutrition : NowNutrition,
            recipeitem1 : recipeitem1,
            recipeitem2 : recipeitem2,
            recipeitem3 : recipeitem3,

            fooditem1 : fooditem1,
            fooditem2 : fooditem2,
            fooditem3 : fooditem3,
            fooditem4 : fooditem4,
            fooditem5 : fooditem5
        }
        
        res.send(result)
        
    },
};

module.exports = dietanalysis;