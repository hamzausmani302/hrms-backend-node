const express = require("express");

const {
  forgotPassword,
  addResource,
  getAllResources,
  updateResource,
  removeResource,
  loginAsResource,
  updateSkills,
  verifyPassword,
  changeForgottenPassword,
  getResourceByKeyword,
  getResourceOnBench,
  getProjectsOfResourcesController,
} = require("../controllers/ResourceController");
const { encrypt } = require("../Middlewares/EncryptPassword");
const { getUserMiddleWare } = require("../Middlewares/getUser");
const { sendMail } = require("../Utils/Mailer");
const { getTokenMiddleWare } = require("../Middlewares/getToken");
const { checkIdMiddleWare } = require("../Middlewares/checkIdMiddleWare");
const { use } = require("../Middlewares/CatchError");
const {
  APIError,
  HTTP400Error,
  HTTP403Error,
} = require("../Utils/Error/CustomError");
const { authorizeUserMiddleWare } = require("../Middlewares/auth");
const { getPermissionById } = require("../Middlewares/getPermissionById");
const { Authorizer } = require("../Middlewares/Authorizer");
const { checkTokenExistence } = require("../Middlewares/checkTokenExistence");

// use(Authorizer.AuthGetDeveloper) ,

const router = express.Router();

router.get(
  "/",
  use(getPermissionById),
  use(authorizeUserMiddleWare),
  use(getAllResources)
);

router.post("/", encrypt, use(addResource));

router.put("/:id", use(updateResource));

router.delete("/:id", use(removeResource));

router.post("/login", use(loginAsResource));

router.put("/skills/:id", use(updateSkills));

router.post(
  "/recover-password",
  use(checkTokenExistence),
  use(getUserMiddleWare),
  use(forgotPassword)
);

router.post("/verify/:id", use(getTokenMiddleWare), use(verifyPassword));

router.post(
  "/new-password/:id/:tid",
  use(checkIdMiddleWare),
  use(changeForgottenPassword)
);
router.get("/onbench", use(getResourceOnBench));

router.get("/search", use(getResourceByKeyword)); //by query: localhost.../search?key= xyz
router.get("/projects/:id", use(getProjectsOfResourcesController));
module.exports = router;
