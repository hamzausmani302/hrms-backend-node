


const {ROUNDS } = require('../config/encryption');
const bcrypt = require('bcrypt');

const hashPassword = async (password )=>{
    const hash = await bcrypt.hash(password, ROUNDS)
  
    return hash;
}


const compareHash = async (password , databaseHash)=>{
    
    const result = await bcrypt.compare(password , databaseHash);
    console.log(compareHash);
    return result;
}


module.exports.HASH_PASSWORD = hashPassword;
module.exports.AUTHENTICATE_HASH = compareHash;
