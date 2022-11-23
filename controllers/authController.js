const User = require("../models/user");
const moment = require("moment");
const bcrypt = require('bcryptjs');

const login = (req, res) =>{
    User.find({ email: req.body.email}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            if(docs.length>0){
                if(bcrypt.compareSync(req.body.password, docs[0].password)){
                    let token = jwt.sign({ foo: 'bar' }, "f0af17449a83681de22db7ce16672f16f37131bec0022371d4ace5d1854301e0", { algorithm: 'RS256'});
                    res.status(200).json({ status: "success", token: token })                    
                }
                else{
                    res.send("Invalid Credentials!");
                }
            }
            else{
                res.send("Invalid Credentials!");
            }
        }
    });
}

const register = async (req, res)=>{
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const user = await new User({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            creation_date: moment().format("MMMM Do YYYY, h:mm:ss a")
        })
        await user.save()
        res.status(200).json({ message: 'added!' })
    } catch (err) {
        console.log(err)
        if(err.code=='11000'){
            res.send('User Already Exists!');
        }
        else{
            res.send({ status: 'err', message: err });
        }
    }
}

module.exports = {
    login,
    register
}