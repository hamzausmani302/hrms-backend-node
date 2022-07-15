const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { APIError } = require("./Error/CustomError");
dotenv.config()


const sendMailCode = async (reciever ,subject , code )=>{
    const email = "hamzausmani021@gmail.com"
    const transporter = await nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : email,
            pass : process.env.MAIL_PASS
        },
       
    })
    
    // "sheryarrajput47@gmail.com"
    const options = {
        from : email,
        to : reciever,
        subject : subject,
        text : `Your password reset code: ${code}\nDo not share with anyone else!\n\nValid for 2 minutes only.`
    }
    await transporter.sendMail(options , (err , info)=>{
        if(err){
            
            return false;
        }
        return true;
    
    })

}


module.exports.sendMail = sendMailCode;