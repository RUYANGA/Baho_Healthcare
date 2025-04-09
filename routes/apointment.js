const ApointmentCtroller=require('../controllers/apointment')



const router=require('express').Router()


router.post('addApointment',ApointmentCtroller)

module.exports=router