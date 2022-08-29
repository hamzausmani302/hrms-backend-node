const dotenv=  require('dotenv');
const jwt = require('jsonwebtoken')

dotenv.config();

const JWTAUTH_SIGN = (payload)=>{               //function for generating token form payload

    const token = jwt.sign(payload , process.env.SECRET_KEY , { expiresIn: '3h' });
    return token;


} 


const JWTAUTH_VERIFY = (token) =>{              // verify token  
    console.log("A SECRET KEY ",process.env.SECRET_KEY)
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;

}




module.exports.JWT_SIGN = JWTAUTH_SIGN
module.exports.JWT_VERIFY = JWTAUTH_VERIFY