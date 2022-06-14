var express=require('express')
var router=express.Router()
var appController=require('../controllers/appController')

router.get('/',appController.home_get)
router.get('/data',appController.data_get)
router.post('/data',appController.data_post)
router.get('/mois',appController.mois_get)
router.post('/mois',appController.mois_post)

module.exports=router
