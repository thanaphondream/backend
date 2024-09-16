const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const payment = require('../controllers/payment')
const upload = require('../middlewares/upload')

router.post('/payments', payment.PaymentSave)
router.post('/pay', upload.array("image",6), payment.transfersave)

router.get('/linemenu/:id', authenticate, payment.paymnetmentLine)
router.get('/payment', authenticate, payment.PaymentShowUser)

router.put('/payments/:id', payment.paystatus)

module.exports = router;


// model Games {
//     id        Int     @id @default(autoincrement())
//     game_name String
//     img       String?
  
//     Order         Order[]
//     gametype_name TypeGames @relation(fields: [gametypeId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//     gametypeId    Int       @map("gametype_Id")
//     receipt       receipt[]
//     Point         Point[]
//   }
//   const product = await db.games.create({
//     data: {
//       game_name: name,
//       img: imageUrls.join(','),
//       // gametypeId:Number(gametypeId)
//       gametype_name: {
//         connect: { id: Number(gametypeId) },
//       },
//     },
//   });