const { default: axios } = require("axios")
const db = require("../models/db")
const cloudUpload = require("../middlewares/cloudUpload");

exports.profilePost = async (req, res, next) => {
    try{
        const { image, imagebg, userId } = req.body
        const profile = await db.profile.create({
            data: {
                image,
                imagebg,
                userId: parseInt(userId)
            }
        })

        res.json({msg: 'Profile This Ok :', profile})
    }catch(err){
        next(err)
    }
}

exports.userId = async (req, res, next) => {
    try{
        const users = await db.profile.findFirst({
            where: {
                userId: req.user.id
            }
        })

        res.json(users)
    }catch(err){
        next(err)
    }
}

exports.profileUpdate = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file; 
  
      const imagePromise = req.files.map((file) => {
        return cloudUpload(file.path);
      });
      const imageUrlArray = await Promise.all(imagePromise);
      const imageUrl = imageUrlArray[0];
  
      const profile = await db.profile.update({
        where: { id: parseInt(id) },
        data: { image: imageUrl }
      });
  
      res.json({ msg: 'Profile updated successfully', profile });
    } catch (err) {
      next(err);
    }
};

exports.profileUpdateimabg = async (req, res, next) => {
    try {
        const { id } = req.params;
        const file = req.file; 
        // const { imagebg } = req.body
    
        const imagePromise = req.files.map((file) => {
          return cloudUpload(file.path);
        });
        const imageUrlArray = await Promise.all(imagePromise);
        const imageUrl = imageUrlArray[0];
    
        const profile = await db.profile.update({
          where: { id: parseInt(id) },
          data: { imagebg: imageUrl }
        });
    
        res.json({ msg: 'Profile updated successfully', profile });
      } catch (err) {
        next(err);
      }
}