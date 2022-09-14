const models = require("../models");
const sequelize = require("sequelize");
const passport = require("passport");
const pbkdf2 = require("crypto");
const { RecipeNutrient } = require("../models");
const Op = sequelize.Op;

const user = {
  setUser: async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
      const exUser = await models.User.findOne({ where: { email } });
      if (exUser) {
        return res.redirect("/join?error=exist");
      }
      await insertUserInfo(email, password, name);
      res.send("유저 email 삽입 성공");
    } catch (err) {
      return res.status(404).send(err);
    }
  },

  checkEmail: async (req, res) => {
    try{
      const email = req.query.email;
      if (email !== undefined) {
        const user = await models.User.findOne({ where: { email: email } });
        if (user) {
          res.send("0");
        } else {
          res.send("1");
        }
      } else {
        res.send("fail");
      }
    }catch(err){
      return res.status(404).send(err);
    }
  },

  login: async (req, res, next) => {
    await passport.authenticate("local", (authError, user, info) => {
      //local 미들웨어가 로컬 로그인 전략 수행
      //성공하거나 실패시 콜백 함수가 실행됨, authError면 실패, 두번째 매개변수가 있으면 성공, 그러면 req.login메서드 실행
      //Passport는 req 객체에 login, logout 메서드를 추가함, req.login은 Passport.serialzeUSer 호출!
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.send(info.message);
      }
      return req.login(user, (loginError) => {
        //req.login이 serializeUser 호출
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        console.log("login suscess");
        return res.send({ user: user });
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logOut();
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  },

  getInfo: (req, res) => {
    try{
      res.send(res.locals.user);
    }catch(err){
      return res.status(404).send(err);
    }
  },

  setInfo: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      await modifyUserInfo(email, password, name);
    } catch (err) {
      return res.status(404).send(err);
    }
  },

  //회원 정보 및 전체 정보 삭제
  deleteInfo: async (req, res) => {
    try{
      const id = res.locals.user.id;
      const email = res.locals.user.email;
      await deleteAllInfo(email);
    }catch(err){
      return res.status(404).send(err);
    }
  },

  //회원 리스트 조회
  admin: async (req, res) => {
    try{
      const userList = await models.User.findAll({
        attributes: ["email", "name", "createdAt"],
      });
      res.send(userList);
    }catch(err){
      return res.status(404).send(err);
    }
  },

  getRecipeList: async (req, res) => {
    try{
      const userId = res.locals.user.id;
      const month = req.query.month;
      const recipeList = await models.UserRecipe.findAll({
        include: [
          {
            model: RecipeNutrient,
            attributes: ["foodImage", "foodName"],
          },
        ],
        where: { userId: userId, date: { [Op.like]: `%${month}%` } },
      });
      res.send(recipeList);
    }catch(err){
      return res.status(404).send(err);
    }
  },

  // 사용자 식단(레시피 리스트들 삭제)
  deleteRecipeList: async (req, res) => {
    try{
      const userId = res.locals.user.id;
      const date = req.query.date;
      await models.UserRecipe.destroy({
        where: {
          userId: userId,
          date: date,
        },
      });
      res.end();
    }catch(err){
      return res.status(404).send(err);
    }
  },

  //사용자 개별 레시피 삭제
  deleteRecipe: async (req, res) => {
    try{
      const userId = res.locals.user.id;
      const date = req.query.date;
      const foodCode = req.query.foodCode;
  
      await models.UserRecipe.destroy({
        where: {
          userId: userId,
          date: date,
          foodCode: foodCode,
        },
      });
      res.end();
    }catch(err){
      return res.status(404).send(err);
    }
  },
};

const insertUserInfo = async (email, password, name) => {
  const randomSalt = pbkdf2.randomBytes(32).toString("hex");
  const cryptedPassword = pbkdf2
    .pbkdf2Sync(password, randomSalt, 65536, 64, "sha512")
    .toString("hex");
  const passwordWithSalt = cryptedPassword + "$" + randomSalt;
  try{
    await models.User.create({
      email: email,
      password: passwordWithSalt,
      name: name,
    });
  }catch(err){
    return res.status(400).send(err);
  }
};

const encryprtPassword = async function (password) {
  const randomSalt = pbkdf2.randomBytes(32).toString("hex");
  const cryptedPassword = pbkdf2
    .pbkdf2Sync(password, randomSalt, 65536, 64, "sha512")
    .toString("hex");
  const passwordWithSalt = cryptedPassword + "$" + randomSalt;
  return passwordWithSalt;
};

const modifyUserInfo = async (email, password, name) => {
  try{
    const passwordWithSalt = await encryprtPassword(password);
    await models.User.update(
      {
        password: passwordWithSalt,
        name: name,
      },
      {
        where: { email: email },
      }
    );
  }catch(err){
    return res.status(400).send(err);
  }
  
};

const deleteAllInfo = async (email) => {
  try{
    const user = await models.User.findOne({
      where: { email: email },
    });
    await models.ExistIngredient.destroy({
      where: { userId: user.id },
    });
    await models.UserIngredient.destroy({
      where: { userId: user.id },
    });
    await models.UserRecipe.destroy({
      where: { userId: user.id },
    });
    await models.User.destroy({
      where: { email: email },
    });
  }catch(err){
    return res.status(404).send(err);
  }
};

module.exports = user;
