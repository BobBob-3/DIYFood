const models = require("../models");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const ingredient = {
  getLiveList: async (req, res) => {
    const p_item_category_code = req.query.category_code;

    //get Today Date
    const d = new Date();
    let p_regday = null;
    //일요일, 월요일의 경우 토요일 데이터 호출
    if (d.getDay() === 0 || d.getDay() === 7) {
      p_regday =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9
          ? (d.getMonth() + 1).toString()
          : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() - 1 > 9
          ? (d.getDate() - 1).toString()
          : "0" + (d.getDate() - 1).toString());
    } else if (d.getDay() === 1) {
      p_regday =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9
          ? (d.getMonth() + 1).toString()
          : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() - 2 > 9
          ? (d.getDate() - 1).toString()
          : "0" + (d.getDate() - 2).toString());
    } else {
      p_regday =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9
          ? (d.getMonth() + 1).toString()
          : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9
          ? d.getDate().toString()
          : "0" + d.getDate().toString());
    }
    let itemList = [];
    const p_cert_key = process.env.GROCERY_APIKEY;
    const p_cert_id = 2676;
    const url = `http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_regday=${p_regday}&p_convert_kg_yn=Y&p_item_category_code=${p_item_category_code}&p_cert_key=${p_cert_key}&p_cert_id=${p_cert_id}&p_returntype=json`;

    try {
      const response = await axios.get(url);
      const itemData = response.data.data.item;
      res.send(itemData);
    } catch (err) {
      return res.status(404).send(error);
    }
  },
  getUserList: async (req, res) => {
    try {
      const ingredientyList = await models.LiveIngredient.findAll({});
      res.send(ingredientyList);
    } catch (err) {
      return res.status(404).send(error);
    }
  },
  setUserList: async (req, res) => {
    try {
      const itemCodeList = req.body.finalCodeList; //array (itemcode)
      const date = req.body.date;
      const userId = res.locals.user.id;
      
      for (let i = 0; i < itemCodeList.length; i++) {
        models.UserIngredient.create({
          userId: userId,
          itemCode: itemCodeList[i].itemCode,
          detailItemCode: itemCodeList[i].detailItemCode,
          price: itemCodeList[i].price,
          date: date,
        });
      }
    } catch (err) {
      return res.status(404).send(error);
    }
  },

  getUserExistList : async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const ingredientyList = await models.ExistIngredient.findAll({
        attributes: ['itemCode'],
        where: {userId : userId}
      });
      res.send(ingredientyList);
    } catch (err) {
      return res.status(404).send(error);
    }
  },
  getExistList: async (req, res) => {
    try {
      const ingredientyList = await models.Ingredient.findAll({});
      res.send(ingredientyList);
    } catch (err) {
      return res.status(404).send(error);
    }
  },
  setExistList: async (req, res) => {
    // 기존 저장 재료를 제거 후 새롭게 이번주 보유 재료를 저장
    try {
      const itemCodeList = req.body; //array (itemcode)
      const userId = res.locals.user.id;
  
      await models.ExistIngredient.destroy({
        where: { userId: userId },
      });
      for (let i = 0; i < itemCodeList.length; i++) {
        await models.ExistIngredient.create({
          userId: userId,
          itemCode: itemCodeList[i],
        });
      }
    } catch (err) {
      return res.status(404).send(error);
    }
  },
};

module.exports = ingredient;
