const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protect = async (req, res, next) => {
    let token;
    // console.log(token)
    if (req.headers.authorization && req.headers.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: { token: "no token!" } });
            }
            // console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded.id }).select("-password");
            if (user?.status === 'block') {
                return res.status(400).json({ error: { user: 'permission Denied Blocked User' } })
            }
            if (user?.status === 'inactive') {
                return res.status(400).json({ error: { user: 'Your Course inactive' } })
            }
            //console.log(user)
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ error: { token: `not authorized token failed! ${error.message}` } });
        }
    } else {
        console.log('no token');
        return res.status(401).json({ error: { token: "no token!" } });
    }
};
module.exports = { protect };