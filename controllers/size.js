const { Size } = require("../database/models");

const addSize = async (req, res, next) => {
  try {
    const { user } = req;
    const { product_id, size } = req.body;
    if (user.role === "admin") {
      if (size === "Large") {
        percentage_price = 0.15;
        const productSize = await Size.create({
          product_id,
          size,
          percentage_price,
        });
        return res.status(201).json({
          status: "success",
          code: 201,
          message: "success create product size",
          data: productSize,
        });
      }
      if (size === "Extra large") {
        percentage_price = 0.25;
        const productSize = await Size.create({
          product_id,
          size,
          percentage_price,
        });
        return res.status(201).json({
          status: "success",
          code: 201,
          message: "success create product size",
          data: productSize,
        });
      }
      if (size === "Small") {
        percentage_price = 0;
        const productSize = await Size.create({
          product_id,
          size,
          percentage_price,
        });
        return res.status(201).json({
          status: "success",
          code: 201,
          message: "success create product size",
          data: productSize,
        });
      }
      if (size === "Medium") {
        percentage_price = 0;
        const productSize = await Size.create({
          product_id,
          size,
          percentage_price,
        });
        return res.status(201).json({
          status: "success",
          code: 201,
          message: "success create product size",
          data: productSize,
        });
      }
    } else {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "cannot edit the product except admin",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const deleteSize = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role === "admin") {
      await Size.destroy({
        where: {
          id,
        },
      });

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Success delete size",
      });
    } else {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "cannot edit the product except admin",
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addSize,
  deleteSize,
};
