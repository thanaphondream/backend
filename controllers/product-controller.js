const db = require("../models/db");

exports.createMenutems = async (req, res, next) => {
    try {
      const { ItemName, price, description, file} = req.body;
      if (!(ItemName && price && description && file)) {
        return next(new Error("Please provide all required fields"));
      }
  
      const menutems = await db.menutems.create({
        data: {
          ItemName,
          price : parseInt(price),
          description,
          file 
        }
      });
  
      res.json({ msg: 'Product created successfully', menutems });
    } catch (error) {
      next(error);
    }
  };

  exports.getmenutems = async (req, res, next) => {
    try {
      const menutems = await db.menutems.findMany();
      res.json(menutems);
    } catch (error) {
      next(error);
    }
  };