const { HTTP403Error } = require("../Utils/Error/CustomError");

class Authorizer {
    //check user have resouces permisson access
    static AuthReadResources(req, res, next) {
        const { readResources } = req.permission;
        if (readResources === false) {

            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthRemoveResources(req, res, next) {
        const { deleteResources } = req.permission;
        if (deleteResources === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthUpdateResources(req, res, next) {
        const { updateResources } = req.permission;
        if (updateResources === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthCreateResources(req, res, next) {
        const { createResources } = req.permission;
        if (createResources === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }
    // check user have  project permission access
    static AuthCreateProject(req, res, next) {
        const { createProject } = req.permission;
        if (createProject === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthReadProject(req, res, next) {
        const { readProject } = req.permission;
        if (readProject === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthRemoveProject(req, res, next) {
        const {deleteProject } = req.permission;
        if (deleteProject === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthUpdateProject(req, res, next) {
        const { updateProject } = req.permission;
        if (updateProject === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    // check user have  Roles permission access

    static AuthCreateRole(req, res, next) {
        const { createRole } = req.permission;
        if (createRole === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthReadRoles(req, res, next) {
        const { readRoles } = req.permission;
        if (readRoles === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthRemoveRoles(req, res, next) {
        const {deleteRoles } = req.permission;
        if (deleteRoles === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthUpdateRoles(req, res, next) {
        const { updateRoles } = req.permission;
        if (updateRoles === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    // check user have permission access to create or update permission

    static AuthCreatePermission(req, res, next) {
        const { createPermission } = req.permission;
        if (createPermission === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthReadPermission(req, res, next) {
        const { readPermission } = req.permission;
        console.log(readPermission);
        if (readPermission === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthRemovePermission(req, res, next) {
        const {deletePermission } = req.permission;
        if (deletePermission === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthUpdatePermission(req, res, next) {
        const { updatePermission } = req.permission;
        if (updatePermission === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    // check user have  client permission access

    static AuthCreateClient(req, res, next) {
        const { createClient } = req.permission;
        if (createClient === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthReadClient(req, res, next) {
        const { readClient } = req.permission;
        if (readClient === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthRemoveClient(req, res, next) {
        const {deleteClient } = req.permission;
        if (deleteClient === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

    static AuthUpdateClient(req, res, next) {
        const { updateClient } = req.permission;
        if (updateClient === false) {
            throw new HTTP403Error("Not allowed to access resource");
        }
        next();
    }

}
module.exports.Authorizer = Authorizer;