const db = require("../models/db");

const { Linenotifys } = require('./LineNotify')
const token = 'waRRbLw3mIM7hEcyKaiUfNadR1O9zcMNloxAORZVTYx'

exports.Paymentsm = async (req, res, next) => {
    try {
        const { userId, amount, price, menutemsId, username, pay, namemenu } = req.body;
        const payment = await db.Payment.create({
          data: {
            userId: parseInt(userId),
            username,
            amount: parseFloat(amount),
            price: parseInt(price),
            menutemsId: parseInt(menutemsId),
            pay,
            namemenu
          }
        });
        res.json({ msg: 'Payment created successfully', payment });

        const text = `text = ชื่อคุณ: ${username}\n ชื่อเมนู: ${namemenu}\n จำนวน: ${amount}รายการ\n ราคารวม: ${price}บาท\n วิธีชำระ: ${pay}\n`
        await Linenotifys(token,text)
      } catch (error) {
        next(error);
      }
}



