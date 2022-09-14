const { sequelize } = require("../models");
const models = require("../models");
const axios = require("axios");
const server = require("../server");
const dotenv = require("dotenv");
const connection = require("../server/mysql");
const _ = require("lodash");
dotenv.config();

const recipe = {
  //레시피 리스트 조회
  getList: async (req, res) => {
    try {
      const pageNum = Number(req.query.pageNum) || 1;
      const contentSize = 20;
      const pnSize = 5; // NOTE: 페이지네이션 개수 설정.
      const skipSize = (pageNum - 1) * contentSize;

      const totalCount = 1061;
      const pnTotal = Math.ceil(totalCount / contentSize);
      const pnStart = (Math.ceil(pageNum / pnSize) - 1) * pnSize + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호
      let pnEnd = pnStart + pnSize - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.

      const url = `https://openapi.foodsafetykorea.go.kr/api/${
        process.env.RECIPE_APIKEY
      }/COOKRCP01/json/${skipSize + 1}/${skipSize + contentSize}/`;

      const response = await axios.get(url);
      const itemData = response.data.COOKRCP01.row;

      const result = {
        pageNum,
        pnStart,
        pnEnd,
        pnTotal,
        contents: itemData,
      };
      res.send(result);
    } catch (err) {
      return res.status(404).send(err);
    }
  },

  //각 레시피 상세 조회
  getRecipe: async (req, res) => {
    try {
      const { foodCode } = req.params;
      const foodResult = await models.RecipeNutrient.findOne({
        attribute: ["foodName"],
        where: { foodCode: foodCode },
      });
      const foodName = foodResult.dataValues.foodName;
      const url1 = `https://openapi.foodsafetykorea.go.kr/api/${
        process.env.RECIPE_APIKEY
      }/COOKRCP01/json/1/1000/RCP_NM=${encodeURI(foodName)}`;
      const url2 = `https://openapi.foodsafetykorea.go.kr/api/${
        process.env.RECIPE_APIKEY
      }/COOKRCP01/json/1001/1500/RCP_NM=${encodeURI(foodName)}`;
      let itemData = "";
      const response = await axios.get(url1);
      if (response.data.COOKRCP01.row !== undefined) {
        itemData = response.data.COOKRCP01.row;
      } else {
        const response2 = await axios.get(url2);
        itemData = response2.data.COOKRCP01.row;
      }
      res.send(itemData);
    } catch (err) {
      return res.status(404).send(err);
    }
  },

  searchRecipe: async (req, res) => {
    //검색 결과 갯수 조회
    let result = "";
    let totalCount = 0;
    if (req.query.recipeName !== undefined) {
      const recipeName = req.query.recipeName;
      const url = `https://openapi.foodsafetykorea.go.kr/api/${
        process.env.RECIPE_APIKEY
      }/COOKRCP01/json/1/1000/RCP_NM=${encodeURI(recipeName)}`;
      try {
        result = await axios.get(url);
        totalCount = result.data.COOKRCP01.row.length;
      } catch (err) {
        return res.status(404).send(err);
      }
    } else {
      const ingredientName = req.query.ingredientName;
      const url = `https://openapi.foodsafetykorea.go.kr/api/${
        process.env.RECIPE_APIKEY
      }/COOKRCP01/json/1/1000/RCP_PARTS_DTLS=${encodeURI(ingredientName)}`;
      try {
        result = await axios.get(url);
        totalCount = result.data.COOKRCP01.row.length;
      } catch (err) {
        return res.status(404).send(err);
      }
    }

    const pageNum = Number(req.query.pageNum) || 1;
    const contentSize = 20;
    const pnSize = 5; // NOTE: 페이지네이션 개수 설정.
    const skipSize = (pageNum - 1) * contentSize;

    const pnTotal = Math.ceil(totalCount / contentSize);
    const pnStart = (Math.ceil(pageNum / pnSize) - 1) * pnSize + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호
    let pnEnd = pnStart + pnSize - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
    const pagingRecipes = result.data.COOKRCP01.row.slice(
      skipSize,
      skipSize + contentSize
    );

    const results = {
      pageNum,
      pnStart,
      pnEnd,
      pnTotal,
      contents: pagingRecipes,
    };
    res.send(results);
  },

  getRecommendList: async (req, res) => {
    try {
      const date = req.query.date;
      const categoryCode = req.query.category;
      const foodCategory = ["밥", "반찬", "국&찌개", "일품", "기타", "후식"];
      const category = foodCategory[categoryCode];

      const userId = res.locals.user.id;
      const userQuery = `SELECT itemCode FROM UserIngredients WHERE date = ${date} AND userId = ${userId} UNION SELECT itemCode FROM ExistIngredients WHERE userId = ${userId} ORDER BY itemCode`;
      connection.query(userQuery, (error, results) => {
        if (error) {
          return res.status(404).send(error);
        }
        const userItemCodes = _.uniq(
          _.map(results, (el) => {
            return el.itemCode;
          })
        );
        if (userItemCodes.length < 2) {
          return res.status(400).send("최소 2개 이상의 재료를 담아주세요!");
        }
        // TODO. 쿼리에 category 적용 필요
        const totalCountQuery = `SELECT foodCode, COUNT(*) AS total_count FROM Recipes WHERE foodCategory = '${category}' GROUP BY foodCode ORDER BY foodCode;`;
        connection.query(totalCountQuery, (error2, results2) => {
          if (error2) {
            return res.status(404).send(error2);
          }
          const totalCounts = JSON.parse(JSON.stringify(results2));
          const itemCountQuery = `SELECT foodCode, COUNT(*) AS item_count FROM Recipes WHERE itemCode IN (${userItemCodes}) GROUP BY foodCode`;
          connection.query(itemCountQuery, (error3, results3) => {
            if (error3) {
              return res.status(404).send(error3);
            }
            const itemCounts = JSON.parse(JSON.stringify(results3));
            const foods = _.map(
              _.filter(
                _.merge(
                  _.keyBy(totalCounts, "foodCode"),
                  _.keyBy(itemCounts, "foodCode")
                ),
                (el) => {
                  return !_.isNil(el.total_count) && !_.isNil(el.item_count);
                }
              ),
              (el) => {
                el.percent = _.floor((el.item_count / el.total_count) * 100);
                return el;
              }
            );
            const foodCodes = _.map(foods, (food) => {
              return food.foodCode;
            });
            const foodMetadataQuery = `SELECT foodCode, foodName, foodImage, foodIngredient FROM RecipeNutrients WHERE foodCode IN (${foodCodes})`;
            connection.query(foodMetadataQuery, (error4, results4) => {
              if (error4) {
                return res.status(404).send(error4);
              }
              const foodMetadatas = JSON.parse(JSON.stringify(results4));
              const recipes = _.orderBy(
                _.filter(
                  _.merge(
                    _.keyBy(foods, "foodCode"),
                    _.keyBy(foodMetadatas, "foodCode")
                  ),
                  (el) => {
                    return !_.isNil(el.foodCode);
                  }
                ),
                ["percent"],
                ["desc"]
              );

              const pageNum = Number(req.query.pageNum) || 1;
              const contentSize = 15;
              const pnSize = 5; // NOTE: 페이지네이션 개수 설정.
              const skipSize = (pageNum - 1) * contentSize;

              const totalCount = recipes.length;
              const pnTotal = Math.ceil(totalCount / contentSize);
              const pnStart = (Math.ceil(pageNum / pnSize) - 1) * pnSize + 1; // NOTE: 현재 페이지의 페이지네이션 시작 번호
              let pnEnd = pnStart + pnSize - 1; // NOTE: 현재 페이지의 페이지네이션 끝 번호.
              const pagingRecipes = recipes.slice(
                skipSize,
                skipSize + contentSize
              );

              const result = {
                pageNum,
                pnStart,
                pnEnd,
                pnTotal,
                contents: pagingRecipes,
              };

              res.send(result);
            });
          });
        });
      });
    } catch (err) {
      console.error(err);
    }
  },

  setRecommendList: async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const userRecipeList = req.body.recipeList;
      const date = req.body.date;

      for (let i = 0; i < userRecipeList.length; i++) {
        await models.UserRecipe.create({
          userId: userId,
          foodCode: userRecipeList[i],
          date: date,
        });
      }
    } catch (err) {
      return res.status(404).send(err);
    }
  },
};

const getRecipeList = async function (startId, endId) {
  try {
    const url = `https://openapi.foodsafetykorea.go.kr/api/${process.env.RECIPE_APIKEY}/COOKRCP01/json/${startId}/${endId}/`;
    const response = await axios.get(url);
    const itemData = response.data.COOKRCP01.row;
    return itemData;
  } catch (err) {
    return res.status(404).send(err);
  }
};

module.exports = recipe;
