
const {showDoctors,showPatient}=require('../controllers/Admin')

const router=require('express').Router()



router.get('/allPatients',showDoctors)




module.exports=router