const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.Carts = async (req, res, next) => {
    try {
        const { itemId } = req.body;

        // ตรวจสอบว่ามีข้อมูลผู้ใช้ปัจจุบันหรือไม่
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // ค้นหาสินค้าใน Prisma โดยใช้ itemId
        const item = await prisma.menutems.findUnique({
            where: {
                id: parseInt(itemId), 
            },
        });

        // ตรวจสอบว่าพบสินค้าหรือไม่
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // ใช้ข้อมูลผู้ใช้จากฐานข้อมูลเพื่อดึงข้อมูลผู้ใช้ที่เกี่ยวข้องกับรายการสินค้า
        const userData = await prisma.user.findFirst({
            where: {
                id: req.user.id
            }
        });

        // สร้างข้อมูลใหม่ในโมเดล Basket จากข้อมูลของสินค้า
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
