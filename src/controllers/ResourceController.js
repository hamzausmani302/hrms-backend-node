
const Resource = require('../Model/resource.schema');
const { AUTHENTICATE_HASH, HASH_PASSWORD } = require('../Utils/Encryption');
const { JWT_SIGN, JWT_VERIFY } = require('../Utils/Authentication');
const path = require("path");
const { ResourceInfo } = require('../DTO/ResourceInfo');
const { addResource, getAllResources, updateResource, removeResource, addSkills, getAResource, getAResourceTest } = require('../Service/ResourceService');
const { HTTP404Error, APIError, HTTP400Error } = require('../Utils/Error/CustomError');
const addResourceController = async (req, res) => {
    const { name, address, designation, joiningDate, email, password, skills, roleId  } = req.body;
    const resource = new Resource({
        name: name,
        address: address,
        designation: designation,
        joiningDate: joiningDate,
        email: email,
        password: password,
        roleId: roleId,
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


module.exports.addResource = addResourceController;
module.exports.getAllResources = getResourcesController;
module.exports.removeResource = removeResourceController;
module.exports.updateResource = updateResourceController;
module.exports.loginAsResource = loginAsResource;
module.exports.updateSkills = updateSkillsController;
