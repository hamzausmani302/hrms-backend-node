const resetPassword = require("../Model/resetPassword.schema");
const {
  APIError,
  HTTP403Error,
  HTTP400Error,
} = require("../Utils/Error/CustomError");
const HttpStatusCode = require("../Utils/Error/HttpStatusCode");

const checkTokenUse = async (req, res, next) => {
  const { tid } = req.body;

  const Token = await resetPassword.findOne({ _id: tid }).catch((err) => {
    throw new APIError(
      "DatabaseError",
      HttpStatusCode.INTERNAL_SERVER,
      true,
      err.message
    );
  });
  if (Token.used === true) {
    throw new HTTP400Error("Trying to use already used token");
  }
  if (Token) {
    throw new APIError(
      "DuplicateEntry",
      HttpStatusCode.INTERNAL_SERVER,
      true,
      "Duplicate token"
    );
  }
  next();
};

module.exports.checkTokenUse = checkTokenUse;
