const Message = require("../models/Message");
const Workspace = require("../models/Workspace");
const Chat = require("../models/Chat");
const getAIreply = require("../services/aiDemo")

const createMsg = async (req, res) => {
  try {
    const { content, role } = req.body;

    const { workspaceId, chatId } = req.params;

    if (!content) {
      return res.status(400).json({
        message: "required",
      });
    }

    const matchWorkspace = await Workspace.findById(workspaceId); //(doesn't it conflict with owner)
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

    const matchChat = await Chat.findOne({
      _id: chatId,
      workspace: workspaceId,
    });

    if (!matchChat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    const newMsg = await Message.create({
      chat: chatId,
      content: content,
    });

    const aiReply = await getAIreply(content);

    const userMsg = {
      _id: newMsg._id,
      content: newMsg.content,
      role: newMsg.role,
    };

    const AiReply = {
      chat : chatId,
      role: "assistant",
      content: aiReply
    }

    const AiMsg = {
      role: AiReply.role,
      content: AiReply.content
    }


    return res.status(201).json({
      message: "Message created Sucessfully",
      userMsg,
      AiMsg
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const getMsg = async (req, res) => {
  try {
    const { workspaceId, chatId } = req.params;

    const matchWorkspace = await Workspace.findById(workspaceId); //first we check if workspace exist or not
    if (!matchWorkspace) {
      return res.status(404).json({
        message: "not found",
      });
    }

    if (matchWorkspace.owner.toString() !== req.currentUser.id) {
      // user and requested workspace are same or not
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const matchChat = await Chat.findOne({
      //it give surity that chat exist with required workspaceId
      _id: chatId,
      workspace: workspaceId,
    });

    if (!matchChat) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    const Msgs = await Message.find({
      //and we return msgs with requested chatId
      chat: chatId,
    });

    if (Msgs.length === 0) { //because findone or by id returns null find returns empty array[]
      return res.status(200).json({
        message: "No messages",
      });
    }

    return res.status(200).json({
      message: "Fetched Sucessfully",
      Msgs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

const getOneMsg = async (req, res) => {
  try {
    const { chatId, workspaceId, messageId } = req.params;

    const matchWorkspace = await Workspace.findById(workspaceId);
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

    const matchChat = await Chat.findOne({
      _id: chatId,
      workspace: workspaceId,
    });

    if (!matchChat) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    const Msg = await Message.findOne({
      _id: messageId,
      chat: chatId,
    });

    if (!Msg) {
      return res.status(404).json({
        message: "not found",
      });
    }

    return res.status(200).json({
      message: "Fetched Sucessfully",
      Msg,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

const deleteMsg = async (req, res) => {
  try {
    const { chatId, workspaceId, messageId } = req.params;

    const matchWorkspace = await Workspace.findById(workspaceId);
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

    const matchChat = await Chat.findOne({
      _id: chatId,
      workspace: workspaceId,
    });

    if (!matchChat) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    const Msg = await Message.findOne({
      _id: messageId,
      chat: chatId,
    });

    if (!Msg) {
      return res.status(404).json({
        message: "not found",
      });
    }

    await Msg.deleteOne();

    return res.status(200).json({
      message: "Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal error",
    });
  }
};

module.exports = { createMsg, getMsg, getOneMsg, deleteMsg };
