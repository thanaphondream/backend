const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    const { basket } = req.params
    try{
        const carsdelete = await prisma.basket.delete({
            where: {
                id: Number(basket)
            }
        })
        res.json(carsdelete)
    }catch(err){
        next(err)
    }
}