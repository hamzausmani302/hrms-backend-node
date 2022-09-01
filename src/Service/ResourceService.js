const Resource = require("../Model/resource.schema.js");
const Project = require("../Model/project.schema.js");
const addResource = async (resource) => {
  const result = await resource.save();
  return result;
};
const getAllResources = async (filter) => {
  const result = await Resource.find(filter);
  return result;
};

const searchResource = async (key) => {
  try {
    const objRes = await Product.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { employmentStatus: key },
        { designation: { $regex: key, $options: "i" } },
      ],
    });
    return objRes;
  } catch (err) {
    return "No such product found!";
  }
};

const updateResource = async (id, newResource) => {
  const updatedResult = await Resource.findOneAndUpdate(
    { _id: id },
    newResource,
    { new: true }
  );
  return updatedResult;
};

const removeResource = async (id) => {
  const deletedResult = await Resource.findOneAndDelete({ _id: id });
  return deletedResult;
};
const addSkills = async (id, updates) => {
  const { skills } = updates;
  const addedResult = await Resource.findOneAndUpdate(
    { _id: id },
    { $push: { skills: skills } },
    { new: true }
  );
  return addedResult;
};

const getAResource = async (filter) => {
  const result = await Resource.findOne(filter);

  return result;
};

const getAResourceTest = async (filter) => {
  const email = filter.email;
  const aggregation = [
    {
      $match: {
        email: email,
      },
    },
    {
      $lookup: {
        from: "roles",
        localField: "roleId",
        foreignField: "_id",
        as: "newRole",
        pipeline: [
          {
            $project: { __v: 0 },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$newRole",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "permissions",
        localField: "newRole.permissions",
        foreignField: "_id",
        as: "permission",
      },
    },
    {
      $unwind: {
        path: "$permission",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
  const _resource = await Resource.aggregate(aggregation);
  return _resource;
};

const resourceOnBench = async (threshhold) => {
  const result = await Resource.find({
    availability: { $lte: threshhold || 7 },
  });
  return result;
};

const getProjectsOfResources = async (id, status) => {

  const result = await Project.find({resourcesOnProject: { $in: id }})
  return result  
};

const getUserWithPasswordfromResource = async()=>{
  const user = await Resource.find({password: { $exists: true }});
  if (!user) {
    throw new Error("User not found");
  }
  return user;

}













module.exports.addResource = addResource;
module.exports.getAllResources = getAllResources;
module.exports.updateResource = updateResource;
module.exports.removeResource = removeResource;
module.exports.addSkills = addSkills;
module.exports.getAResource = getAResource;
module.exports.getAResourceTest = getAResourceTest;
module.exports.searchResource = searchResource;
module.exports.resourceOnBench = resourceOnBench;
module.exports.getProjectsOfResources = getProjectsOfResources;
module.exports.getUserWithPasswordfromResource = getUserWithPasswordfromResource;
