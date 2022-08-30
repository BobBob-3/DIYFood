const Sequelize = require('sequelize');
module.exports = class recipe extends Sequelize.Model {
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
      itemCode: { 
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      itemName: { 
        type: Sequelize.STRING(45), 
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Recipe',
      tableName: 'recipe',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {}
};