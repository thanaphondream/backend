const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.productModel = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = await prisma.product.findUnique({ where: { id: productId } });
    res.json(productData);
  } catch (error) {
    next(error);
  }
};
