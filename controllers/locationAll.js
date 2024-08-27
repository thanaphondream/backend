const db = require("../models/db");

exports.provinces = async (req, res, next) => {
    try {
        const provides = await db.provinces.findMany()
        res.json(provides)
    }catch(err){
        next(err)
    }
}

exports.amphures = async (req, res, next) => {
    try{
        const amphures = await db.amphures.findMany()
        res.json(amphures)
    }catch(err){
        next(err)
    }
}

exports.districts = async (req, res, next) => {
    try{
        const districts = await db.districts.findMany()
        res.json(districts)
    }catch(err){
        next(err)
    }
}

exports.locations = async (req, res, next) => {
    try{
        const { address, provinces, amphures, districts, zip_code, road, village, house_number, other,userId, longitude, latitude } = req.body
        const location = await db.location.create({
            data: {
                provinces,
                amphures,
                districts,
                zip_code: parseInt(zip_code),
                road,
                village,
                house_number,
                other,
                longitude: parseFloat(longitude),
                latitude: parseFloat(latitude),
                userId: parseInt(userId)
            }
        })
        res.json({msg: 'location All ', location})
    }catch(err){
        next(err)
    }
}

exports.locationID = async (req, res, next) => {
    try{

        // console.log('sss',req.user.id)
        const locations = await db.location.findMany({
            where: {
                userId: req.user.id
            }
        })
        res.json(locations)
    }catch(err){
        next(err)
    }
}

exports.locationidshow = async (req, res, next) => {
    try{
        const { id } = req.params;
        console.log(id)
        const location = await db.location.findFirst({
            where: {
              id: Number(id)
            }
          })
        
        res.json(location)
    }catch(err){
        next(err)
    }
}