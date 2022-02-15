const { validateToken } = require("../utils/jwt")

const authAdmin = async (req, res, next) => {
    // if (req.headers.authorization) {
    //   const token = req.headers.authorization.split(" ")[1];
    //   const decoded = await validateToken(token);
    //   if (decoded.error) {
    //     return res.status(401).send(decoded);
    //   }
    //   req.user = decoded.data;
    //   return next();
    // }else {
    //   return res.status(401).send({
    //     error: 'You are not authorized.'
    //   });
    // }
    console.log("auth admin called")
    return next()

}

const authUser = async (req, res, next) => {
    if(!req.cookies){
        return res.redirect('/users/login')
    }
    console.log(req.cookies)

    return next()
}


module.exports = {
    authAdmin,
    authUser
};