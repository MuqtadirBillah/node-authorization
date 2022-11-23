const jwt = require("jsonwebtoken")



const verifyToken = (req, res, next)=>{
    const token = req.headers.token
    if(token!=undefined){
        jwt.verify(token, "f0af17449a83681de22db7ce16672f16f37131bec0022371d4ace5d1854301e0", function(err, decoded) {
            if(err){
                console.log(err)
                res.send({ status: "error", error: 'Unauthorized User!' });
            }
            else{
                if(decoded!=undefined){
                    console.log(decoded)
                    next();
                }
                else{
                    res.send({ status: "error", error: 'Unauthorized User!' });
                }
            }
        });
    }
    else{
        res.send({ status: "error", error: 'Unauthorized User!' });
    }
}

module.exports = verifyToken;