const {unauthrized,Admin}=require('../middlewares/authorize');
const {showDoctors,showPatient}=require('../controllers/Admin')

const router=require('express').Router()



router.get('/patient/getAll',unauthrized,Admin,showPatient)
router.get('/doctor/getAll',showDoctors)




module.exports=router