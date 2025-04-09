const ApointmentCtroller=require('../controllers/apointment')

const{unauthrized,Admin}=require('../middlewares/authorize')

const {newApointmentValidation}=require('../middlewares/validations')


const router=require('express').Router()


router.post('/addApointment/:id',unauthrized,newApointmentValidation,ApointmentCtroller)

module.exports=router