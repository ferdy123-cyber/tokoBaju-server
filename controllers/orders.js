const { Order, Product, Transaction } = require("../database/models");

const addOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const { product_id, product_qty, transaction_id } = req.body;

    const product = await Product.findOne({
      where: {
        id: product_id,
      },
    });

    if (user.role === "admin") {
      throw new Error("Admin can not order the product");
    }

    if (product.stock === 0) {
      throw new Error("Stock empty");
    }

    if (product_qty > product.stock) {
      throw new Error("over product quantity from stock");
    }

    const sameProduct = await Order.findOne({
      where: {
        transaction_id: transaction_id,
        product_id: product_id,
        user_id: user.id,
      },
    });
    if (sameProduct) {
      await Order.update(
        {
          product_qty: sameProduct.product_qty + product_qty,
          product_price:
            (sameProduct.product_qty + product_qty) * product.price,
          product_discount:
            (sameProduct.product_qty + product_qty) * product.discount,
          user_id: user.id,
        },
        {
          where: {
            product_id,
            transaction_id,
          },
        }
      );

      await Product.update(
        {
          stock: product.stock - product_qty,
        },
        {
          where: {
            id: product_id,
          },
        }
      );

      const newOrder = await Order.findOne({
        where: {
          product_id,
        },
      });
      return res.status(201).json({
        status: "success",
        code: 201,
        data: newOrder,
      });
    } else {
      const newOrder = await Order.create({
        product_id,
        product_qty,
        product_price: product.price * product_qty,
        product_discount: product.discount * product_qty,
        transaction_id,
        user_id: user.id,
      });
      const sisaStock = product.stock - newOrder.product_qty;

      await Product.update(
        {
          stock: sisaStock,
        },
        {
          where: {
            id: product_id,
          },
        }
      );

      return res.status(201).json({
        status: "success",
        code: 201,
        data: newOrder,
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getByTransactionId = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const order = await Order.findAll({
      where: {
        transaction_id: id,
      },
    });

    if (!order) {
      throw new Error("Your order not found");
    }

    return res.status(201).json({
      status: "success",
      code: 201,
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteByid = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
      },
    });
    const product = await Product.findOne({
      where: {
        id: order.product_id,
      },
    });
    await Product.update(
      {
        stock: product.stock + order.product_qty,
      },
      {
        where: {
          id: order.product_id,
        },
      }
    );

    const deletedOrder = await Order.destroy({
      where: {
        id,
      },
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: deletedOrder,
    });
  } catch (error) {
    return next(error);
  }
};

const editOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const { id, product_qty, product_id } = req.body;

    const product = await Product.findOne({
      where: {
        id: product_id,
      },
    });

    const updateOrder = await Order.update(
      {
        id,
        user_id: user.id,
        product_qty,
        product_price: product.price * product_qty,
        product_discount: product.discount * product_qty,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(201).json({
      status: "success",
      code: 201,
      data: updateOrder,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addOrder,
  getByTransactionId,
  deleteByid,
  editOrder,
};
