const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const db = require("../models/db");
const { json } = require('express');

exports.Carts = async (req, res, next) => {
    try {
        const { itemId } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const item = await prisma.menutems.findUnique({
            where: {
                id: parseInt(itemId), 
            },
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const userData = await prisma.user.findFirst({
            where: {
                id: req.user.id
            }
        });
        console.log(userData)
        const newBasketItem = await prisma.basket.create({
            data: {
                ItemName: item.ItemName,
                price: item.price,
                description: item.description,
                UserId: req.user.id,
                menutemsId: item.id,
                file: item.file,
            },
        });

        res.status(200).json({ message: 'Item added to basket successfully' });
    } catch (error) {
        next(error);
    }
};

exports.CartOrder = async (req, res, next) => {
    try{
        const cartorder = await prisma.basket.findMany({
            where: {
                UserId: req.user.id
            },
            include: {
                menutem: true
            }
        })
        return res.json(cartorder)
    }catch(error){
        next(error)
    }
}

exports.Cartdelete = async (req, res, next) => {
    const { cartId } = req.params
    try{
        const carsdelete = await db.cart.delete({
            where: {
                id: Number(cartId)
            }
        })
        res.json(carsdelete)
    }catch(err){
        next(err)
    }
}

exports.cartsSave = async (req, res ,next) => {
    try{
        const { total, all_price, userId, status, menutemsId } = req.body
        
        const carts = await db.cart.create({
            data: {
                total,
                all_price: all_price * total,
                userId: parseInt(userId),
                status,
                menutemsId: parseInt(menutemsId)
            }
        })

        res.json({mgs: 'CartsSave This Ok : ', carts})
    }catch(err){
        next(err)
    }
}

exports.cartsShow = async (req, res, next) => {
    try{
        const cart = await db.cart.findMany({
            where: {
                userId: req.user.id
            },include: {
                menutems: true
            }
        })
        res.json(cart)
    }catch(err){
        next(err)
    }
}

exports.cartUpdate = async (req, res, next) => {
    try{
        const { id } = req.params
        const { total, all_price } = req.body
        console.log(555, id, total, all_price)

        const cart = await db.cart.update({
            where: {
                id : parseInt(id)
            },data: {
                total: parseInt(total),
                all_price: parseInt(all_price)
            }
        })
        res.json({mag: 'CartUpdate This Ok ', cart})
    }catch(err){
        next(err)
    }
}

exports.cartsdalete = async (req, res, next) => {
    try{
        const { cartId } = req.params
        const cart = await db.cart.delete({
            where: {
                id: parseInt(cartId)
            }
        })
        res.json({msg: 'DaleteCart This Ok : ', cart})
    }catch(err){

    }
}