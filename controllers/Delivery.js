const db = require("../models/db");
const cloudUpload = require("../middlewares/cloudupload");
const { connect } = require("../routes/auth-route");

exports.Dliverysave = async (req, res, next) => {
    try{
        const { name, Note, paymentId, date} = req.body
        const imagePromises = req.files.map(file => cloudUpload(file.path)); 
        const imageUrls = await Promise.all(imagePromises);

        const deliverys = await db.delivery.create({
            data: {
                image: imageUrls.join(','),
                name,
                Note,
                paymentId: parseInt(paymentId),
                date: new Date(date)
            }
        })
        res.json({mgs: "DeliveryFoodSave This Ok :", deliverys})
    }catch(err){
        next(err)
    }
}

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