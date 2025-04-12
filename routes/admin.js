const {unauthrized,Admin}=require('../middlewares/authorize');
const {showDoctors,showPatient}=require('../controllers/Admin')

const router=require('express').Router()



router.get('/allPatients',unauthrized,Admin,showDoctors)




module.exports=router