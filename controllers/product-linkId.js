const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.orderdate = async (req, res, next) => {
  try {
    const {id} = req.params;
    const productData = await prisma.menutems.findFirst({
      where: {
        id: Number(id)
      }
    })
    if (!productData) {
      return res.status(404).json({ message: "ไม่พบสินค้าที่ค้นหา" });
    }
    res.json(productData);
    console.log(productData)
  } catch (error) {
    next(error); 


  }
};

exports.deletemenuorder = async (req, res, next) => {
  const { menutem } = req.params;
  console.log(menutem)

  try {
    const deletedMenuItemOrder = await prisma.menutems.delete({
      where: {
        id: Number(menutem)
      }
    });
    res.json(deletedMenuItemOrder);
  } catch (error) {
    next(error);
  }
};

