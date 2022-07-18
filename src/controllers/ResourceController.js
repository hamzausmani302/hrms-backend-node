
const Resource = require('../Model/resource.schema');
const { AUTHENTICATE_HASH, HASH_PASSWORD } = require('../Utils/Encryption');
const { JWT_SIGN, JWT_VERIFY } = require('../Utils/Authentication');
const path = require("path");
const { ResourceInfo } = require('../DTO/ResourceInfo');
const { addResource, getAllResources, updateResource, removeResource, addSkills, getAResource, getAResourceTest, searchResource} = require('../Service/ResourceService');
const {addToken} = require("../Service/forgetPasswordService");
const { HTTP404Error, APIError, HTTP400Error, HTTP403Error } = require('../Utils/Error/CustomError');
const {passGenerator} = require("../Utils/PasswordGenerator");
const resetPassword = require('../Model/resetPassword.schema');
const HttpStatusCode = require('../Utils/Error/HttpStatusCode');
const { sendMail } = require('../Utils/Mailer');
const { update } = require('../Model/resource.schema');

const getResourceByKeyword = async (req, res, next) =>{
    const {key} = req.query;

    const result = await searchResource(key);
    if(!result)
        return res.status(404).json({'message':result2});

    return res.status(200).json({'message':result});
}

const addResourceController = async (req, res) => {
    const { name, address, designation, joiningDate, email, password, skills, roleId ,employmentStatus } = req.body;
    const resource = new Resource({
        name: name,
        address: address,
        designation: designation,
        joiningDate: joiningDate,
        email: email,
        password: password,
        roleId: roleId,
        employmentStatus : employmentStatus,
        skills: [skills]                         //initially only one skill should be added!
    });

    const result = await addResource(resource).catch(err => {
        throw new APIError("MongooseError", 500, true, err.message);
    })

    res.status(201).send(result);



}

const updateResourceController = async (req, res) => {
    const { id } = req.params;
    const { updates } = req.body;

    const updatedUser = await updateResource(id, updates).catch(err => {
        throw new APIError("MongooseError", 500, true, err.message);
    });
    if (!updatedUser) {
        throw new HTTP404Error("Resource not found")
    }
    res.status(200).json(updatedUser);
}

const updateSkillsController = async (req, res) => {
    const { id } = req.params;
    const { updates } = req.body;
    const updatedRes = await addSkills(id, updates).catch(err => {
        throw new APIError("MongooseError", 500, true, err.message);
    });
    if (!updatedRes) {
        throw new HTTP404Error("Resource not found")
    }
    res.status(200).json(updatedRes)

}

const removeResourceController = async (req, res) => {
    const { id } = req.params;

    const result = await removeResource(id).catch(err => {
        throw new APIError("MongooseError", 500, true, err.message);
    })
    if (!result) {
        throw new HTTP404Error("Resource not found")
    }
    res.status(200).json(result);



}

const getResourcesController = async (req, res) => {
    const filter = req.query;

    const result = await getAllResources(filter).catch(err => {
        throw new APIError("MongooseError", 500, true, err.message);
    });
    res.status(200).json(result);

}

const loginAsResource = async (req, res) => {
    const { email, password } = req.body;
    try {


        const filter = {
            email: email,
        }
        const _resource = await getAResourceTest(filter).catch(err => {
            throw new APIError("mongoose error", 500, true, err.message)
        })
        if (_resource && _resource.length == 0) {
            throw new HTTP404Error("Incorrect username or password");
        }

        const _res = _resource[0]

        const result = await AUTHENTICATE_HASH(password, _res.password);
        if (result) {

            const token = JWT_SIGN({
                email: _res.email,
                password: _res.password
            })
            _res["token"] = token;
            res.cookie("AUTH_TOKEN", token, { maxAge: 900000 })
            return res.status(200).json(ResourceInfo(_res));

        }
        throw new HTTP404Error("Incorrect username of password");









    } catch (err) {
        console.log(err);
        res.status(404).json({ error: err });

    }
}


const forgotPassword = async (req,res)=>{
    const {email ,  user} = req.body;
    //create  a random code
    const code = passGenerator(6);
    
    //add the entry to mongoose 
    const _resetPassword = new resetPassword({
        userId : user._id,
        email : email,
        code : code,
        status :  "ACTIVE",
        createdAt : Date.now()
    })
    // console.log(Date.now().toString())
    const resetRecord = await _resetPassword.save().catch(err=>{
        throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true  , err.message) 
    });

    await sendMail(email , "Reset Password Code: Codup HRMS" , code).catch(err=>{
        throw new APIError("EmailError" , 500 ,true , err.message)
    });
    
    res.status(200).send({
        result : resetRecord,
        redirectionUrl : `/resource/verify/${resetRecord._id}`
    })
    
        
}

const verifyCode = async (req ,res)=>{
    const {id} = req.params;
    const {code , resetDoc} = req.body;
    console.log(id ,  resetDoc , code);
    if(code != resetDoc.code){
        throw new HTTP403Error("The confirmation code donot match")
    }
    
    await resetPassword.findByIdAndUpdate(id , {used : true}).catch(err=>{
        throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true , err.message);
    }, {new : true})
    

    res.status(200).json({
        result : "success",
        passChangeUserId : resetDoc.userId
    })
}

const changeForgottenPassword = async (req,res)=>{
    const {id , password} =req.body;
    const hash = await HASH_PASSWORD(password);
    const updatedResult = await Resource.findByIdAndUpdate(id , {password : hash }).catch(err=>{
        throw new APIError("DatabaseError" , HttpStatusCode.INTERNAL_SERVER , true , err.message)
    });
    if(!updatedResult){
        throw new HTTP404Error("Resource not found");
    }
    res.status(200).json({
        "message" : "password change successful",
    })
}


module.exports.addResource = addResourceController;
module.exports.getAllResources = getResourcesController;
module.exports.removeResource = removeResourceController;
module.exports.updateResource = updateResourceController;
module.exports.loginAsResource = loginAsResource;
module.exports.updateSkills = updateSkillsController;
module.exports.forgotPassword = forgotPassword;
module.exports.verifyPassword = verifyCode;
module.exports.changeForgottenPassword = changeForgottenPassword;
module.exports.getResourceByKeyword = getResourceByKeyword;