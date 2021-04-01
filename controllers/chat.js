const { Chat, Listchat } = require("../database/models");
const { findAll } = require("../database/models/user");

const addChat = async (req, res, next) => {
  try {
    const { user } = req;
    const { receiver_id } = req.body;

    const newChat = await Chat.create({
      user_id: user.id,
      sender_id: user.id,
      receiver_id,
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: newChat,
    });
  } catch (err) {
    return next(err);
  }
};

const AllChat = async (req, res, next) => {
  const { user } = req;

  const allChat = await Chat.findAll({
    include: [
      {
        model: Listchat,
        as: "listchats",
      },
    ],
    where: {
      user_id: user.id,
    },
  });

  return res.status(201).json({
    status: "success",
    code: 201,
    data: allChat,
  });
};

const chatbyAdmin = async (req, res, next) => {
  try {
    const { user } = req;
    const chatAdmin = await Chat.findAll({
      where: {
        receiver_id: user.id,
      },
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: chatAdmin,
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  addChat,
  AllChat,
  chatbyAdmin,
};
