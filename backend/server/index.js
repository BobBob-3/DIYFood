const dotenv = require('dotenv');
const axios = require('axios');
const models = require('../models');
dotenv.config();

const sequelize = require("sequelize");
const Op = sequelize.Op;

async function getTodayData(p_item_category_code, p_regday) {
    try {  
        let itemList = [];
        const p_cert_key = process.env.GROCERY_APIKEY;
        const p_cert_id = 2676;
        const url = `http://www.kamis.or.kr/service/price/xml.do?action=dailyPriceByCategoryList&p_product_cls_code=01&p_regday=${p_regday}&p_convert_kg_yn=Y&p_item_category_code=${p_item_category_code}&p_cert_key=${p_cert_key}&p_cert_id=${p_cert_id}&p_returntype=json`;
        const response = await axios.get(url);
        const itemData = response.data.data.item;

        for (let i = 0; i < itemData.length; i++) {
            const itemCode = itemData[i].item_code;
            const detailItemCode = itemData[i].kind_code;
            const rank = itemData[i].rank;
            const price = itemData[i].dpr2;

            // 값이 없는 경우 해당 값은 기존 데이터 사용
            if(price === '-')
                continue;

            const item = {
                itemCode: itemCode,
                detailItemCode: detailItemCode,
                rank: rank,
                price: price,
            }
            await models.LiveIngredient.update(
                {
                 price : item.price
              }, {
                where: {
                    [Op.and]: [
                        {itemCode : item.itemCode},
                        {detailItemCode : item.detailItemCode},
                        {rank: item.rank},
                    ]
                }
              });
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = { getTodayData };