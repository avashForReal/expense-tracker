const jwt = require('jsonwebtoken');

const secret = "2mI5z99SXwrOGo3hPxeA";

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

const validateToken = async (token) => {
  try{
    return {
      data:jwt.verify(token, secret)
    };
  }catch(e){
    return {
      error:"Invalid token"
    };
  }
}


module.exports = {
  generateToken, validateToken
}