const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) =>  {
    if  (req.user) {
        res.status(200).json({
            error: false,
            message: "Log in Success",
            user: req.user
        })
    } else {
        res.status(403).json({
            error: true,
            message: "Not authorized!"
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in Failure"
    })
})

router.get('/auth/login',
passport.authenticate('google', {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed"
})
)

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000')
})

module.exports = router;