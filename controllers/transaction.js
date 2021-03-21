const { Transaction, Order } = require("../database/models");

const addTransaction = async (req, res, next) => {
  try {
    const { user } = req;
    const { status, total_payment } = req.body;

    const newTransaction = await Transaction.create({
      status,
      user_id: user.id,
      total_payment,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: newTransaction,
    });
  } catch (error) {
    return next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: {
        transaction_id: id,
      },
    });

    const totalPay = orders
      .map((e) => e.product_discount)
      .reduce((a, b) => a + b, 0);

    await Transaction.update(
      {
        total_payment: totalPay,
      },
      {
        where: {
          id,
        },
      }
    );

    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: transaction,
      tot: totalPay,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllByUser = async (req, res, next) => {
  try {
    const { user } = req;

    const transactions = await Transaction.findAll({
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],

      where: {
        user_id: user.id,
      },
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: transactions,
    });
  } catch (error) {
    return next(error);
  }
};

const deleTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Transaction.destroy({
      where: {
        id,
      },
    });

    await Order.destroy({
      where: {
        transaction_id: id,
      },
    });

    return res.status(201).json({
      status: "success",
      code: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const editTransaction = async (req, res, next) => {
  try {
    const { id } = req.body;

    await Transaction.update(
      {
        status: "Paid",
      },
      {
        where: {
          id,
        },
      }
    );
    const updatetrsc = await Transaction.findOne({
      where: {
        id,
      },
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: updatetrsc,
    });
  } catch (error) {
    return next(error);
  }
};

const allTransaction = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role === "admin") {
      const all = await Transaction.findAll();
      return res.status(201).json({
        status: "success",
        code: 201,
        data: all,
      });
    } else {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "not admin",
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addTransaction,
  findById,
  getAllByUser,
  deleTransaction,
  editTransaction,
  allTransaction,
};
