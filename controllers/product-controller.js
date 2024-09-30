// const { json } = require("express");
const db = require("../models/db");
// const cloudUpload = require('../middlewares/cloudUpload');

// exports.createMenutems = async (req, res, next) => {
//   try {
//     const { ItemName, price, description, status } = req.body;
//     if (!(ItemName && price && description && req.files && req.files.length > 0)) {
//       return next(new Error("Please provide all required fields"));
//     }

//     const imagePromises = req.files.map(file => cloudUpload(file.path)); 
//     const imageUrls = await Promise.all(imagePromises);


//     const menutems = await db.menutems.create({
//       data: {
//         ItemName,
//         price: parseInt(price, 10),
//         description,
//         file: imageUrls.join(','),
//         status: 1
//       }
//     });

//     res.json({ msg: 'Product created successfully', menutems });
//   } catch (error) {
//     next(error);
//   }
// };


  exports.getmenutems = async (req, res, next) => {
    try {
      const menutems = await db.menutems.findMany();
      res.json(menutems);
    } catch (error) {
      next(error);
    }
  };

  // exports.getmenutemsupdate = async (req, res, next) => {
  //   try {
  //     const { ItemName, price, description } = req.body;
  //     const { id } = req.params;
  

  
  //     // const menutem = await db.menutems.findUnique({
  //     //   where: { id: parseInt(id) }
  //     // });
  
  //     // if (!menutem) {
  //     //   return res.status(404).json({ msg: "resource not found" });
  //     // }
  
  //     const imagePromises = req.files.map(file => cloudUpload(file.path)); 
  //     const imageUrls = await Promise.all(imagePromises);
  
  //     const updatedMenutem = await db.menutems.update({
  //       where: { id: parseInt(id) },
  //       data: {
  //         ItemName,
  //         price: parseInt(price, 10),
  //         description,
  //         file: imageUrls.join(',')
  //       }
  //     });
  
  //     res.json(updatedMenutem);
  //   } catch (err) {
  //     next(err);
  //   }
  // };
  

  exports.updaterole = async (req, res, next) => {
    try{
      const { id } = req.params
      const { role } = req.body
      const users = await db.user.update({
        where: {
          id: Number(id)
        },data: {
          role
        }
      })

      res.json({msg: "UpdateRole This Ok : ", users})
    }catch(err){
      next(err)
    }
  }

  exports.showall = async (req, res, next) => {
    try{
      const users = await db.user.findMany({})
      res.json(users)
    }catch(err){
      next(err)
    }
  }

exports.statusedit = async (req, res, next) => {
  try{
    const { id } = req.params
    const { status } = req.body
    const munus = await db.menutems.update({
      where:{
        id: Number(id)
      },data: {
        status,
      }
    })
    res.json({mag: "Update Status This OK : ", munus})
  }catch(err){
    next(err)
  }
}