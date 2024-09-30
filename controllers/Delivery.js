const db = require("../models/db");
// const cloudUpload = require("../middlewares/cloudUpload");
const { connect } = require("../routes/auth-route");

// exports.Dliverysave = async (req, res, next) => {
//     try {
//         const { Note, paymentId, date } = req.body;

//         const image = req.files['image'] ? await cloudUpload(req.files['image'][0].path) : null;
//         const imgpay = req.files['imgpay'] ? await cloudUpload(req.files['imgpay'][0].path) : null;
        
//         const delivery = await db.delivery.create({
//             data: {
//                 image,
//                 imgpay,
//                 Note,
//                 paymentId: parseInt(paymentId),
//                 date: new Date(date),
//             }
//         });

//         res.json({ msg: "Delivery food saved successfully.", delivery });
//     } catch (err) {
//         next(err);
//     }
// };

exports.CancalSave = async (req, res, next) => {
    try {
        const { note, date, orderId } = req.body
        const cancels = await db.cancel.create({
            data: {
                note,
                date: new Date(date),
                orderId: parseInt(orderId)
            }
        })
        res.json({mgs: "CancelSave This Ok : ",cancels})
    }catch(err){
        next(err)
    }
}