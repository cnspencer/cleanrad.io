const express = require("express");
// https://expressjs.com/en/guide/routing.html#express-router
const router = express.Router();
const passport = require("passport");
router.get("/", (req, res) => {
    // renders the index.ejs page
    res.render("index", {
      // This gets rendered as the browsers title
      // it is passed into the ejs page as the variable 'title'
      title: "CleanRad.io",
      user: req.user && {
        "id": req.user.id,
        "email": req.user.email, 
        "displayName": req.user.displayName
      }
    });
  });
router.get("/library/music", (req, res) => {
    // renders the music.ejs page
    res.render("music", {
      // This gets rendered as the browsers title
      // it is passed into the ejs page as the variable 'title'
      title: "CleanRad.io",
      user: req.user && {
        "id": req.user.id,
        "email": req.user.email, 
        "displayName": req.user.displayName
      }
    });
});
router.get("/home", (req, res) => {
    // renders the home.ejs page
    res.render("accounthome", {
      // This gets rendered as the browsers title
      // it is passed into the ejs page as the variable 'title'
      title: "CleanRad.io"
    });
});
router.get("/cart", (req, res) => {
    // renders the cart.ejs page
    res.render("cart", {
      // This gets rendered as the browsers title
      // it is passed into the ejs page as the variable 'title'
      title: "CleanRad.io",
      user: req.user && {
        "id": req.user.id,
        "email": req.user.email, 
        "displayName": req.user.displayName
      }
    });
});
router.get("/mymusic", (req, res) => {
    // renders the mymusic.ejs page
    res.render("mymusic", {
      // This gets rendered as the browsers title
      // it is passed into the ejs page as the variable 'title'
      title: "CleanRad.io",
      user: req.user && {
        "id": req.user.id,
        "email": req.user.email, 
        "displayName": req.user.displayName
      }
    });
});
router.get("/settings", (req, res) => {
    // renders the settings.ejs page
    res.render("settings", {
      // This gets rendered as the browsers title
      // it is passed into the ejs page as the variable 'title'
      title: "CleanRad.io",
      user: req.user && {
        "id": req.user.id,
        "email": req.user.email, 
        "displayName": req.user.displayName
      }
    });
});
// The detail page should be generalizable, but isn't hooked up to the music database yet, so some hardcoded ones follow
// router.get("/library/music/detail/:subject", (req, res) => {
//     // renders the detail.ejs page
//     res.render("detail", {
//       // This gets rendered as the browsers title
//       // it is passed into the ejs page as the variable 'title'
//       //title: req.params[0] + " Details - CleanRad.io",
//       //subject: req.params[0],
//       title: req.params[0] + " on CleanRad.io",
//       subject: req.params[0],
//       user: req.user && {
//         "id": req.user.id,
//         "email": req.user.email, 
//         "displayName": req.user.displayName,
//         //"accountType": req.user.type
//       }
//     });
// });
router.get("/library/music/detail/songsaboutjane", (req, res) => {
  // renders the detail.ejs page
  res.render("detail", {
    // This gets rendered as the browsers title
    // it is passed into the ejs page as the variable 'title'
    //title: req.params[0] + " Details - CleanRad.io",
    //subject: req.params[0],
    title: "Songs About Jane on CleanRad.io",
    subject: "Songs About Jane",
    user: req.user && {
      "id": req.user.id,
      "email": req.user.email, 
      "displayName": req.user.displayName,
    }
  });
});
////// User Sign up and login is explained roughly here
////// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
router.get("/login", function(req, res) {
  res.render("login", {
    title: "Login Page",
    layout: "login-layout",
    message: req.flash("loginMessage")
  });
});
router.post("/login", function(req, res, next, ...args) {
  return passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next, ...args);
});
router.get("/signup", function(req, res) {
  res.render("signup", {
    title: "Signup Page",
    layout: "login-layout",
    message: req.flash("signupMessage")
  });
});
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/", // redirect to the secure profile section
    failureRedirect: "/signup", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
module.exports = router;
