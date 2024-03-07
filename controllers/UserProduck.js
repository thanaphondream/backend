const db = require("../models/db");

exports.userproduck = async (req, res, next) => {
  try {
    const purchases = await db.Payment.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        menutem: true
      }
    });
    
    return res.json(purchases);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.deletemenu = async (req, res, next ) => {
  const {paymentId} = req.params

  try {
      const menutems = await db.Payment.delete({
          where: {
              id: Number(paymentId)
          }
      })
      res.json(menutems)
  } catch (error) {
      next(error)
      
  }
}

