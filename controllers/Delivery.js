const db = require("../models/db");
const cloudUpload = require("../middlewares/cloudupload");

exports.Dliverysave = async (req, res, next) => {
    try{
        const { name, Note, paymentId} = req.body
        const imagePromises = req.files.map(file => cloudUpload(file.path)); 
        const imageUrls = await Promise.all(imagePromises);

        const deliverys = await db.delivery.create({
            data: {
                image: imageUrls.join(','),
                name,
                Note,
                paymentId: parseInt(paymentId)
            }
        })
        res.json({mgs: "DeliveryFoodSave This Ok :", deliverys})
    }catch(err){
        next(err)
    }
}