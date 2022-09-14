const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

// // passport.use('kakao', new KakaoStrategy({
// //     clientID: '69573529168e45d59663e2888a63c906',
// //     callbackURL: '/auth/kakao/callback',     // Redirect URI
// //   }, async (accessToken, refreshToken, profile, done) => {
// //     //console.log(profile);
// //     console.log(accessToken);
// //     console.log(refreshToken);
// // }))

router.get('/kakao', passport.authenticate('kakao'));

router.get(
    '/kakao/callback',
    passport.authenticate('kakao', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.redirect('/');
    },
);

module.exports = router;

// // router.get('/kakao', passport.authenticate('kakao-login'));
// // router.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
// //     failureRedirect: '/',
// // }), (req, res) => {
// //     res.redirect('/');
// // });
