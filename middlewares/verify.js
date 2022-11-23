const jwt = require("jsonwebtoken")
const { jwt_key } = require("../config/db.config")
const { handleResponseWithStatus } = require("../helper/utils");



const verifyToken = (req, res, next)=>{
    const token = req.headers.token
    if(token!=undefined){
        jwt.verify(token, jwt_key, function(err, decoded) {
            if(err){
                // next(err);
                handleResponseWithStatus(res, 401, false, err, { status: "error", error: 'Unauthorized User!' });
            }
            else{
                if(decoded!=undefined){
                    console.log('-----------Token Decoded!')
                    console.log(decoded)
                    console.log('-----------Token Decoded!')
                    // res.send(decoded)
                    res.locals = decoded;
                    next();
                }
                else{
                    handleResponseWithStatus(res, 401, false, "", { status: "error", error: 'Unauthorized User!' });
                }
            }
        });
    }
    else{
        handleResponseWithStatus(res, 401, false, "", { status: "error", error: 'Unauthorized User!' });
    }
}

module.exports = verifyToken;