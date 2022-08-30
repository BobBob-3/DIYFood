const Sequelize = require('sequelize');
module.exports = class recipeNutrient extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      foodCode: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      foodName: { 
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      foodEnergy: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },     
     foodCar: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      }, 
     foodPro: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },         
     foodFat: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
     foodNat: {
        type: Sequelize.INTEGER.UNSIGNED,
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
      tableName: 'recipeNutrient',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {}
};