const Chat = require("../models/Chat");
const Workspace = require("../models/Workspace");

const createChat = async (req, res) => {
  try {
    const { title } = req.body;
    const { workspaceId } = req.params; // on clicking sends which workspace id acc. to the workspace clicked

    if (!title) {
      return res.status(400).json({
        message: "title required",
      });
    }

    const matchWorkspace = await Workspace.findById(workspaceId); // workspace id is unique inside it chats live W1-c1,c2,c3  W2- c1,c2,c3

    if (!matchWorkspace) {
      //we verify cause our route is /api/workspaces:workspaceID/chats/:id
      return res.status(404).json({
        //i want to update chat :id inside workspaec :workspaceId  if someone sends put /w1/c2 request all c2 will be changed that doest belong to w1
        message: "not found",
      });
    }

    if (matchWorkspace.owner.toString() !== req.currentUser.id) {
      // to check the workspcae belongs to current user or not  workspace.owner stores the  user id and req.currentuser.id is provided by authMiddleware
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const newChat = await Chat.create({
      workspace: workspaceId,
      title,
    });

    const createdChat = {
      message: "Chat created",
      chat: {
        _id: newChat._id,
        title: newChat.title,
      },
    };

    return res.status(201).json({
      message: "Created Successfully",
      createdChat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const getChat = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const matchWorkspace = await Workspace.findById(workspaceId);

    if (!matchWorkspace) {
      return res.status(404).json({
        message: "not found",
      });
    }

    if (matchWorkspace.owner.toString() !== req.currentUser.id) {
      // to check the workspace belongs to current user or nnt
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const chats = await Chat.find({ workspace: workspaceId }); // we didnt use chhat to workspace security check because
    //query already gurantee every chat belong to requested woorkspace {worspace : workspaceId}

    return res.status(200).json({
      message: "Fetched Successfully",
      chats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const getOneChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { workspaceId } = req.params;

    const matchWorkspace = await Workspace.findbById(workspaceId);

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

    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    if (chat.workspace.toString() !== workspaceId) {
      //to verify that if the chat is present, also then the chat belongs to same workspace or someother workspace ,else if someone does /workspaces/W1/chats/C5
      //where C5 actually belongs to W2,  API would return it.
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    return res.status(200).json({
      message: "Fetched Successfully",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { workspaceId } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title required",
      });
    }

    const matchWorkspace = await Workspace.findById(workspaceId); //the request will be put/workspaces/workspaceId/:id
    //this is to verfiy that the worspaceId that came, there is a workspace with that Id
    if (!matchWorkspace) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    if (matchWorkspace.owner.toString() !== req.currentUser.id) {
      // this is to verify the workspace requested belongs to current loggedin user
      return res.status(403).json({
        // owner has UserId , authmiddleware gives the currentUser Id
        message: "forbidden",
      });
    }

    const chat = await Chat.findOne({
      // this is short version before this we did something chat.Workspaace != workspace
      _id: id, //to check if chat belong to the workspace or not
      workspace: workspaceId, // now findone will look for chat with the requested chat id and workspace id
    });

    if (!chat) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    chat.title = title;

    await chat.save();

    const updatedChat = {
      _id: chat._id,
      title: chat.title,
    };

    return res.status(200).json({
      message: "updated sucessfully",
      updatedChat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { workspaceId } = req.params;

    const matchWorkspace = await Workspace.findById(workspaceId);

    if (!matchWorkspace) {
      return res.status(404).json({
        message: "not found",
      });
    }

    if (matchWorkspace.owner.toString() !== req.currentUser.id) {
      return res.status(403).json({
        message: "forbidden",
      });
    }

    const chat = await Chat.findOne({
      _id: id,
      workspace: workspaceId,
    });

    if (!chat) {
      return res.status(404).json({
        message: "not found",
      });
    }

    await chat.deleteOne();

    return res.status(200).json({
      message: "deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

module.exports = { createChat, getChat, getOneChat, updateChat, deleteChat };
