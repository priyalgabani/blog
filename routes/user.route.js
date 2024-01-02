const {Router} = require("express")
const { Signdata, logindata } = require("../controllers/user.controllers")
const router =Router()



router.get("/register", (req, res) => {
  res.render("register")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/article", (req, res) => {
    res.render("article")
})

router.get("/articleform", (req, res) => {
    res.render("articleform")
})
  
  

router.post("/register", Signdata)

router.post("/login",logindata);


module.exports =router