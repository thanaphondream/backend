const db = require("../models/db");

exports.requires = async (req, res, next) => {
    try{
        const { rating, comment, userId, menutemsId } = req.body
        const require = await db.reviews.create({
            data:{
                rating: parseInt(rating),
                comment,
                userId: Number(userId),
                menutemsId: parseInt(menutemsId)
            }
        })
        res.json(require)
    }catch(err){
        next(err)
    }
}

exports.reviewsproduct = async (req, res, next) => {
    try{
        const { id } = req.params
        const reviews = await db.menutems.findMany({
            where: {
                id: parseInt(id)
            },include: {
                Reviews: {
                    include: {
                        user: true
                    }
                }
            }
                
        })
        res.json(reviews)
    }catch(err){
        next(err)
    }
}
