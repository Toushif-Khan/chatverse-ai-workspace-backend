const Workspace = require("../models/Workspace");

const createWorkspace = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "name required",
      });
    }

    const newWorkspace = await Workspace.create({
      owner: req.currentUser.id, // user id sent by middleware attached to req object
      name: name,
      icon: icon,
    });

    const createdWorkspace = {
      message: "Workspace Created Successfully",

      workspace: {
        _id: newWorkspace._id, //workspace id created by mongodb
        name: newWorkspace.name,
        icon: newWorkspace.icon,
      },
    };

    return res.status(201).json(createdWorkspace);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const getWorkspace = async (req, res) => {
  try {
    const owner = req.currentUser.id;

    const workspaces = await Workspace.find({ owner }); //Rule of thumb
    // Listing resources (find): If your query already filters by the logged-in user (or another ownership field), an additional ownership check is usually unnecessary.
    // Workspace.find({ owner: req.currentUser.id })
    // Fetching one resource by ID (findById): You must verify ownership after fetching it, because findById only checks _id, not who owns it.
    return res.status(200).json({
      message: "workspaces fetched successfully",
      workspaces,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const getOneWorkspace = async (req, res) => {
  try {
    const { id } = req.params; // not req.params.id as we are destructuring not assigning if assigining then const id = req.params.id

    const oneWorkspace = await Workspace.findById(id); // searches by Id assigned by mongodb to the workspace , on click frontend sends the _id assigned by mongodb and backend search with the same id
    // why (id) & not ({id}) because findbyId looks for _id itself if we were doing  findone then findOne({_id : id}) means where _id = id
    if (!oneWorkspace) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    if (oneWorkspace.owner.toString() !== req.currentUser.id) {
      // cause owner is a objectId(check in workspace Schema that'll be objectId("68..."), so, .tostring()
      return res.status(403).json({
        message: "Forbidden", // object workspace  {_id:w1, owner: u1 , name : personal} this is to verify current logged in user and the requested workspace belong to same person
      });
    }

    return res.status(200).json(oneWorkspace);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

const updateWorspace = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, icon } = req.body;

    const matchWorkspace = await Workspace.findById(id);

    if (!matchWorkspace) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    if (matchWorkspace.owner.toString() !== req.currentUser.id) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    matchWorkspace.name = name;
    matchWorkspace.icon = icon;

    await matchWorkspace.save(); // after changes .save saves document

    const updatedWorkspace = {
      _id: matchWorkspace._id,
      name: matchWorkspace.name,
      icon: matchWorkspace.icon,
    };

    return res.status(200).json({
      message: "updated",
      updatedWorkspace,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const matchWorkspace = await Workspace.findById(id);

    if (!matchWorkspace) {
      return res.status(404).json({
        message: "not found",
      });
    }

    if (matchWorkspace.owner.toString() !== req.currentUser.id) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await matchWorkspace.deleteOne();

    return res.status(200).json({
      message: "deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

module.exports = {
  createWorkspace,
  getWorkspace,
  getOneWorkspace,
  updateWorspace,
  deleteWorkspace,
};
