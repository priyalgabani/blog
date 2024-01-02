// const user = require("../models/users.Schema");/
const articaldata = require("../models/article.schema");


const createdata = async (req, res) => {
    let datas = await articaldata.findById(req.cookies.id);
    let { title, content, image,} = req.body;
    let data = await blogdata.create({
      title,content,image,author: datas.username,
    });
    res.cookie("article", data.id).send(`articles created by ${datas.username} `);
}

const createget = (req, res) => {
    res.render("article")
}

const getindex = (req, res) => {
    res.render("index")
}


const articledelete = async (req, res) => {
    let { id } = req.params;
    let data = await blogdata.findByIdAndDelete(id);
    try {
        if (data) res.redirect("/blog");
        else {
            res.send("no found");
        }
    } catch (error) {
        res.send("testing");
    }
};

const articleedit = async (req, res) => {
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
};
const update=async (req,res)=>{
    const {id} = req.params;
    
    let udata = await blogdata.findById(id);
    res.render("updateblog", {updata});
}


const allarticle = async (req, res) => {
    try {
        let data = await articaldata.find();
        return res.send(data);

    } catch (error) {
        return res.send(error.message);
    }
}

module.exports = {createdata, createget, getindex, allarticle ,articledelete,articleedit,update}