const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const payload = await jwt.verify(token, process.env.SECRET);
            console.log(payload)
            req.payload = payload;
            next();
        } else {
            return res.status(401).json({
                message: "no user logged in"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Error in auth",
            error
        });
    }
}

module.exports = auth;
