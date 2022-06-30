const {HASH_PASSWORD} =    require('../Utils/Encryption');
const encrypt = async (req,res,next)=>{
    const password = req.body.password
    if(password){
        
        const hash = await HASH_PASSWORD(password);
        console.log(hash);
        req.body.password = hash;
        
    }
    next();
}


module.exports.encrypt = encrypt;