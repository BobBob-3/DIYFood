const Sequelize = require('sequelize');

module.exports = class RecipeNutrient extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      foodCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
      foodName: { 
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      foodEnergy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },     
     foodCar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
     foodPro: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },         
     foodFat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     foodNat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
      foodImage: { 
        type: Sequelize.STRING(150),
        allowNull: false,
      }, 
      foodIngredient: { 
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'RecipeNutrient',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.RecipeNutrient.hasMany(db.Recipe, {foreignKey: 'itemCode', targetKey: 'foodCode'})
  }
};