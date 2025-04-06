const authControler=require('../controllers/patient');
const {
    siginupValidator,
    verifyValidator,
    resendOtpValidator,
    loginValidator,
    updatePatientValidation

}=require('../middlewares/validations');

const Upload=require('../middlewares/uploadFiles')

const {unauthrized,Admin}=require('../middlewares/authorize')

const {
    Register,
    verifyOtp,
    resendOtp,
    Login,
    lognOut,
    Dashboard,
    updateUser

}=require('../controllers/patient')

const router=require('express').Router();
router.post('/signup',siginupValidator,Upload.single('image'),Register);

router.post('/verify',verifyValidator,verifyOtp);
router.post('/resendOtp',resendOtpValidator,resendOtp);

router.post('/login',loginValidator,Login);
router.post('/dashboard',unauthrized,Dashboard);
router.post('/lognout',unauthrized,lognOut);
router.post('/update',unauthrized,updatePatientValidation,updateUser);

module.exports=router