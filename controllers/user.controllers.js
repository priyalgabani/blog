

const user = require("../models/user.schema");


const Signdata = async(req , res)=>{
    try{
        let data = await user.findOne({email:req.body.email});
        if(data){
            return res.send("user already exists");
        }
        else{
            let data = await user.create(req.body);
            return res.cookie("role", data.role).cookie("id", data.id).send(`Account created successfully ${data.username}`);
        }
    }
    catch(error){
        return res.send({error:"errors"});
    }
}


// const registerrender = (req, res) => {
//     res.render("register")
// }

// const loginrender = (req, res) => {
//     res.render("login")
// }


const logindata = async (req, res) => {
    try {
        let data = await userdata.findOne({email : req.body.email});
        if (!data){
            return res.send(`Invalid Credentials.`)
        }

        if(data.password != req.body.password){
            return res.send(`Invalid Credentials.`)
        }

        return res.cookie("role", data.role).cookie("id", data.id).send(`Welcome User ${data.username}`);

    } catch (error) {
        return res.send(error.message)
    }
}



module.exports = {Signdata ,logindata }