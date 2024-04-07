const db = require("../models/db");

const { Linenotifys } = require('./LineNotify')
const token = 'waRRbLw3mIM7hEcyKaiUfNadR1O9zcMNloxAORZVTYx'

exports.Paymentsm = async (req, res, next) => {
    try {
        const { userId, amount, price, menutemsId, username, pay, namemenu } = req.body;
        console.log(menutemsId)
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
        console.log(userId , username)
        res.json({ msg: 'Payment created successfully', payment });

        const text = `text = ชื่อคุณ: ${username}\n ชื่อเมนู: ${namemenu}\n จำนวน: ${amount}รายการ\n ราคารวม: ${price}บาท\n วิธีชำระ: ${pay}\n`
        await Linenotifys(token,text)
      } catch (error) {
        next(error);
      }
}

exports.graph = async (req, res, next) => {
  try{
    const payments = await db.Payment.findMany();
      res.json(payments);
  }catch(err){
      next(err)
  }
}



