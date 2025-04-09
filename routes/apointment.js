const ApointmentCtroller=require('../controllers/apointment')

const{unauthrized,Admin}=require('../middlewares/authorize')


const router=require('express').Router()


router.post('/addApointment/:id',unauthrized,ApointmentCtroller)

module.exports=router