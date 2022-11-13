const jwt = require("jsonwebtoken");
const createErr = require("createerror")
const verifyController = (req, res, next) => {

    if (req.headers['authorization']) {
        const beaerToken = req.headers['authorization'].split(' ')//beaer token
        const token = beaerToken[1];
        jwt.verify(token, "secretKey", (err, payload) => {
            if (err) { 
                return next(createErr.Unauthorized())
                // next(createErr)
            }
        });
        req.payload = payload
        next()
    } else {
        return res.status(401).json("not authenticated");
    }
}
module.exports = { verifyController };