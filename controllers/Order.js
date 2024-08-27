const { json } = require("express");
const db = require("../models/db");

exports.orders = async (req, res, next) => {
    try {
        const { total_all, allprice, status, date} = req.body;

        const order = await db.order.create({
            data: {
                total_all: parseInt(total_all),
                allprice: parseInt(allprice),
                status,
                date: new Date(date),
            }
        });

        // Create ordercarts
        // const ordercarts = await Promise.all(userId.map((uid, index) => {
        //     console.log('ff', total[index])
        //     return db.ordercart.create({
        //         data: {
        //             total: parseInt(total_all[index]),  // Use the `total` field for ordercart
        //             all_price: parseInt(allprice[index]),
        //             status: status,
        //             userId: parseInt(uid),
        //             menutemsId: parseInt(menutemsId[index]),
        //             orderId: order.id
        //         }
        //     });
        // }));

        res.json({ order });
    } catch (err) {
        next(err);
    }
};

exports.ordercarts = async (req, res, next) => {
    try{
        const { orderId, total, all_price, userId, status, menutemsId } = req.body
        const ordercart = await db.orderCart.create({
            data: {
                orderId: parseInt(orderId),
                total: parseInt(total),
                all_price: parseInt(all_price),
                userId: parseInt(userId),
                status,
                menutemsId: parseInt(menutemsId)
            }
        })
        res.json({mgs: 'OrderCart This Ok : ', ordercart})
    }catch(err){
        next(err)
    }
}

exports.orderOfficer = async (req, res, next) => {
    try{
        const order = await db.order.findMany(
        //     {
        //     where: {
        //         status: 'รอจัดส่ง'
        //     }
        // }
        {
            include: {
                Payment:{
                    include: {
                        location: true,
                        user: true,
                        Delivery: true
                    }
                },
                ordercart: {
                    include: {
                        menutems: true
                    }
                }
            }
        }
        )
        res.json(order)
    }catch(err){
        next(err)
    }
}

exports.OrderUpdateStatus = async (req, res, next) => {
    try{
        const { id } = req.params
        const { status } = req.body
        const orders = await db.order.update({
            where: {
                id: Number(id)
            },
            data: {
                status
            }
        })

        res.json({msg: "UpdateStatusOrder This Ok : ", orders})
    }catch(err){
        next(err)
    }
}

exports.orderupdetestatu = async (req, res, next) => {
    try{
        const { id } = req.params
        const { status } = req.body
        const order = await db.order.update({
            where: {
                id: Number(id)
            },data: {
                status
            }
        })
        res.json({mgs: "Upderstaus", order})
    }catch(err){
        next(err)
    }
}