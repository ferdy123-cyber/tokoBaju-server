const { Review } = require("../database/models");
const moment = require("moment");

const addReview = async (req, res, next) => {
  try {
    const { user } = req;
    const { comment, product_id, rating } = req.body;

    const newReview = await Review.create({
      user_id: user.id,
      user_name: user.full_name,
      comment,
      product_id,
      rating,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: newReview,
    });
  } catch (err) {
    return next(err);
  }
};

const getReview = async (req, res, next) => {
  try {
    const review = await Review.findAll();
    return res.status(201).json({
      status: "success",
      code: 201,
      data: review,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addReview,
  getReview,
};
