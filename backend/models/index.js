const Sequelize = require('sequelize');
const User = require('./user');
const Grocery = require('./grocery');
const ExistGrocery = require('./existgrocery');
const recipe = require('./recipe');
const recipenutrient = require('./recipenutrient');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Grocery = Grocery;
db.ExistGrocery = ExistGrocery;
db.recipe = recipe;
db.recipenutrient = recipenutrient;

User.init(sequelize);
Grocery.init(sequelize);
ExistGrocery.init(sequelize)
recipe.init(sequelize);
recipenutrient.init(sequelize);

User.associate(db);
Grocery.associate(db);
ExistGrocery.associate(db);
recipe.associate(db);
recipenutrient.associate(db);
  
module.exports = db;