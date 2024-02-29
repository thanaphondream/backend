const db = require("../models/db");

exports.Paymentsm = async (req, res, next) => {
    try {
        const { userId, amount, price, menutemsId, username } = req.body;
        const payment = await db.Payment.create({
          data: {
            userId: parseInt(userId),
            username,
            amount: parseFloat(amount),
            price: parseInt(price),
            menutemsId: parseInt(menutemsId)
          }
        });
    
        res.json({ msg: 'Payment created successfully', payment });
      } catch (error) {
        next(error);
      }
}
