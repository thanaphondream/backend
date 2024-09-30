const { json } = require("express");
const db = require("../models/db");
const omise = require('omise')({ 'secretKey': 'skey_test_608h8g2ktfwnpf8sx9t' });
const { Linenotifys } = require('./LineNotify')
const token = 'waRRbLw3mIM7hEcyKaiUfNadR1O9zcMNloxAORZVTYx'
// const cloudUpload = require("../middlewares/cloudUpload");

exports.Paymentsm = async (req, res, next) => {
    try {
        const { userId, amount, price, menutemsId, username, pay, namemenu, locationId, locationaddress, status } = req.body;
        console.log(menutemsId)
        const payment = await db.Payment.create({
          data: {
            userId: parseInt(userId),
            username,
            amount: parseFloat(amount),
            price: parseInt(price),
            menutemsId: parseInt(menutemsId),
            pay,
            namemenu,
            locationId: parseInt(locationId),
            status: 'กำหลังจัดส่ง'
          }
        });
        console.log(userId , username)
        res.json({ msg: 'Payment created successfully', payment });

        const text = `text = ชื่อคุณ: ${username}\n ชื่อเมนู: ${namemenu}\n จำนวน: ${amount}รายการ\n ราคารวม: ${price}บาท\n วิธีชำระ: ${pay}\n`
        await Linenotifys(token,text)


        const location = await db.location.findFirst({
          where: {
            id: Number(locationId)
          }
        });
    
        if (location) {
          const text01 = `ที่อยู่\n จังหวัด ${location.provinces}\n อำเภอ${location.amphures} \n ตำบล${location.districts} \n ถนน ${location.road} หมู่ ${location.village} บ้านเลขที่ \n ${location.house_number}`;
          await Linenotifys(token, text01);
        } else {
          console.error('Location not found');
        }
    
        res.json({ msg: 'Payment created successfully', payment });
    
  

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

exports.createPayment = async (req, res, next) => {
  const { amount } = req.body; 

  try {
    const payment = await db.paymentQR.create({
      data: {
        amount: parseFloat(amount),
        status: 'pending',
      },
    });

    res.status(201).json(payment); 
  } catch (error) {
    next(error); 
  }
};

// Function to create queue
exports.createQueue = async (paymentId) => {
  try {
    const queue = await db.queue.create({
      data: {
        status: 'pending',
        payment: {
          connect: { id: paymentId },
        },
      },
    });
    return queue;
  } catch (error) {
    throw new Error(`Queue creation failed: ${error.message}`);
  }
};

// Function to charge customer (using Omise as example)
exports.chargeCustomer = async (amount, token) => {
  const omise = require('omise')({
    publicKey: 'pkey_test_608h8g1bwbz5a7e34sh',
    secretKey: 'skey_test_608h8g2ktfwnpf8sx9t',
  });

  try {
    const charge = await omise.charges.create({
      amount: amount * 100, // Omise uses cents
      currency: 'THB',
      card: token,
    });
    return charge;
  } catch (error) {
    throw new Error(`Payment failed: ${error.message}`);
  }
};

exports.PaymentSave = async (req, res, next) => {
  try{
    const { userId, amount, pay, status, locationId, orderId} = req.body

    const payment = await db.payment.create({
      data: {
        userId: parseInt(userId),
        amount: parseFloat(amount),
        pay,
        status,
        locationId: parseInt(locationId),
        orderId: parseInt(orderId)
      }
    })
    res.json({msg: 'Payment This Ok : ', payment})
  }catch(err){
    next(err)
  }
}

exports.paymnetmentLine = async (req, res, next) => {
  try{
    const { id } = req.params
    const Linepaymentmenu = await db.payment.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        order: {
          include: {
            ordercart: {
              include: {
                menutems: true
              }
            }
          }
        },
        location: true,
      }
    })
    res.json(Linepaymentmenu)

    // const img = "https://res.cloudinary.com/daw1e3jbg/image/upload/v1723846206/dkhqbokhcsjbdwwiexm3.jpg";
    const img = Linepaymentmenu.order.ordercart.map(cart => cart.menutems.file);
    
    const tx = `
      ชำระผ่าน: ${Linepaymentmenu.pay}
      สถานะ: ${Linepaymentmenu.status}
      ที่อยู่: ${Linepaymentmenu.location.provinces}, ${Linepaymentmenu.location.amphures}, ${Linepaymentmenu.location.districts}, รหัสไปรษณีย์: ${Linepaymentmenu.location.zip_code}
      ถนน: ${Linepaymentmenu.location.road}, หมู่บ้าน: ${Linepaymentmenu.location.village}, บ้านเลขที่: ${Linepaymentmenu.location.house_number},  ${Linepaymentmenu.location.other}
      สถนาะ: ${Linepaymentmenu.order.status} 
      จำนวนรวม: ${Linepaymentmenu.order.total_all}
      ราคารวม: ${Linepaymentmenu.order.allprice} Baht
      เวลาสั้งซื้อ: ${Linepaymentmenu.order.date}
        ${Linepaymentmenu.order.ordercart.map(cart => `
      รากายโดยรวม:
      ชื่อเมนู: ${cart.menutems.ItemName}, จำนวน: ${cart.total}จำนวน, ราคา: ${cart.menutems.price} บาท`).join('')}
    `;

    await Linenotifys(token, tx, img)
  }catch(err){
    next(err)
  }
}

exports.PaymentShowUser = async (req, res, next) => {
  try{
      const order = await db.payment.findMany({
          where: {
            userId: req.user.id
          },include: {
            user: true,
            Delivery: true,
            order: {
              include: {
                ordercart: {
                  include: {
                    menutems: true
                  }
                },
                Cancel: true
              }
            }
          }
      })
      res.json(order)
  }catch(err){
      next(err)
  }
}

// exports.transfersave = async (req, res, next) => {
//   try{
//     const { paymentId, date } = req.body
//     const imagePromises = req.files.map(file => cloudUpload(file.path)); 
//     const imageUrls = await Promise.all(imagePromises);

//     const trans = await db.transfer.create({
//       data: {
//         image: imageUrls.join(','),
//         paymentId: parseInt(paymentId),
//         date: new Date(date)
//       }
//     })

//     res.json({mgs: "TransFerSave This Ok : ", trans})
//   }catch(err){

//   }
// }

exports.paystatus = async (req, res, next) => {
  try{
    const { id } = req.params
    const { pay, status } = req.body
    const paymets = await db.payment.update({
        where: {
          id: Number(id)
        }, data: {
          status,
          pay
        }
    })
    res.json({msg: "Payment Update This Ok : ", paymets})
  }catch(err){
    next(err)
  }
}