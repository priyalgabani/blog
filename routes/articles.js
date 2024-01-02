const {Router} = require("express");
const user = require("../models/user.schema");
const articaldata = require("../models/article.schema");
const { isAuth, validation, islogin, } = require("../middlewares/auth");

const article = Router();

article.get("/create", isAuth ,(req, res) => {
  res.render("post");
})

article.post("/create", isAuth,validation , async (req, res) => {
  let datas = await user.findById(req.cookies.id);
  let { title, content, image,} = req.body;
  let data = await blogdata.create({
    title,content,image,author: datas.username,
  });
  res.cookie("blogId", data.id).send(`blog created by ${datas.username} `);
});

article.get("/article", async (req, res) => {
  let { category } = req.query;
  if (category) {
    data = await articaldata.find({ category: category });
  } else {
    data = await articledata.find();
  }
  res.send(data);
});

article.get("/", (req, res) => {
  res.render("blog");
});

article.delete("/delete", async (req, res) => {
  let data = await blogdata.deleteMany({ title: "checking" });
  res.send(data);
});

article.delete("/delete/:id", isAuth, async (req, res) => {
  let { id } = req.params;
  let data = await blogdata.findByIdAndDelete(id);
  try {
    if (data) res.redirect("/article");
    else {
      res.send("no found");
    }
  } catch (error) {
    res.send("testing");
  }
});

article.patch("/edit/:id", isAuth, async (req, res) => {
  let { id } = req.params;
  let data = await blogdata.findByIdAndUpdate(id, req.body);
  try {
    if (data) res.send("updated");
    else {
      res.send("not found");
    }
  } catch (error) {
    res.send("testing");
  }
});

article.patch("/comment/:mid", islogin, async (req, res) => {
  let { id } = req.cookies;
  let { mid } = req.params;
  let User = await user.findById(id);
  let post = await articledata.findById(mid);
  post.comments.push({ username: User.username, text: req.body.text });
  await post.save();
  res.send(post);
});


article.get("/", (req, res) => {
  res.render("article");
});

module.exports = article