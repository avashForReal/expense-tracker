const { validateToken } = require("../utils/jwt")

const checkAuth = (userRole) => {
    // return another middleware 
    return async (req,res,next) => {
        if (!req.cookies["auth-token"]) {
            return res.redirect('/users/login')
        }
        const decoded = await validateToken(req.cookies["auth-token"]);
        if (decoded.error) {
            // create a error page and render it
            return res.json(decoded)
        }
        if (decoded.data.role !== userRole) {
            // create a error page and render it: todo:
            return res.json({error: "not authorized"})
        }
        req.user = decoded.data
        return next()
    }
}

const authAdmin = async (req, res, next) => {
    if (!req.cookies["auth-token"]) {
        return res.redirect('/users/login')
    }
    const decoded = await validateToken(req.cookies["auth-token"]);
    if (decoded.error) {
        // create a error page and render it
        return res.json(decoded)
    }
    if (decoded.data.role !== "admin") {
        // create a error page and render it
        return res.json({error: "not authorized"})
    }
    req.user = decoded.data
    return next()

}

const authUser = async (req, res, next) => {
    if (!req.cookies["auth-token"]) {
        return res.redirect('/users/login')
    }
    const decoded = await validateToken(req.cookies["auth-token"]);
    if (decoded.error) {
        // create a error page and render it
        return res.json(decoded)
    }
    if (decoded.data.role !== "user") {
        // create a error page and render it
        return res.json({error: "not authorized"})
    }
    req.user = decoded.data
    return next()
}

module.exports = {
    checkAuth,
    authAdmin,
    authUser
};