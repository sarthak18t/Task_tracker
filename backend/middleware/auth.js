const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const payload = await jwt.verify(token, process.env.SECRET);
            req.payload = payload;
            next();
        } else {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
    } catch (error) {
        res.status(401).send({
            message: "Error in auth",
            error
        });
    }
}

module.exports = auth;
