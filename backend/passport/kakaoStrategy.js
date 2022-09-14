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
                console.log(profile._json.kakao_account.email)
                console.log(accessToken)
                console.log(refreshToken)
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
                            password : accessToken,//'7XXSpVbjANfOtG9cFxQXVFNcCIRQ0Zmf0lECeit-JwgudvGTg8h5ApiiSMcigRrI52HMAAorDSAAAAGDPF-8ow',
                            createdAt : profile.connected_at,
                            updatedAt : profile.connected_at,
                            //provider: 'kakao',
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

// import { Strategy as KakaoStrategy } from "passport-kakao";
// import { User } from "../models";

// // 2. 카카오 로그인 (콜백 함수 실행 안 됨)
// // 4. 콜백 함수 실행 됨
// passport.use(
//   new KakaoStrategy(
//     {
//       clientID: '69573529168e45d59663e2888a63c906',
//       clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
//       callbackURL: '/auth/kakao/callback',
//     },
//     async (_, __, profile, cb) => {
//       const {
//         id,
//         username: name,
//         _json: {
//           properties: { profile_image },
//           kakao_account: { email },
//         },
//       } = profile;
//       try {
//         const user = await User.findOne({ email });
//         if (user) {
//           user.kakaoId = id;
//           user.save();
//           return cb(null, user);
//         } else {
//           const newUser = await User.create({
//             email,
//             name,
//             kakaoId: id,
//             avartarUrl: profile_image,
//           });
//           return cb(null, newUser);
//         }
//       } catch (error) {
//         return cb(error);
//       }
//     }
//   )
// );