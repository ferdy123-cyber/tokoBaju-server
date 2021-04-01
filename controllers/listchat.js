const { Listchat } = require("../database/models");

const addListchat = async (req, res, next) => {
  try {
    const { user } = req;
    const { chat, chat_id } = req.body;

    const newListchat = await Listchat.create({
      user_id: user.id,
      chat_id,
      chat,
      user_name: user.full_name,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: newListchat,
    });
  } catch (err) {
    return next(err);
  }
};

const allListchat = async (req, res, next) => {
  const all = await Listchat.findAll();

  return res.status(201).json({
    status: "success",
    code: 201,
    data: all,
  });
};

module.exports = {
  addListchat,
  allListchat,
};
