const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    passport.use(
        new kakaoStrategy(
            {
                clientID: process.env.kakao_ID,
                callbackURL:'/auth/kakao/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                // console.log('kakao profile', profile);
                console.log(profile)
                // console.log(profile._json.kakao_account.email)
                // console.log(accessToken)
                // console.log(refreshToken)
                try{
                    const exUser = await User.findOne({
                        where: { id : profile.id},
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        //가입되지 않은 유저
                        const newUser = await User.create({
                            id: profile.id,
                            email: profile._json.kakao_account.email,
                            name: profile.displayName,
                            password : accessToken,
                            createdAt : profile.connected_at,
                            updatedAt : profile.connected_at,
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
};