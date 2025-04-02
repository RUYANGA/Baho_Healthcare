const authControler=require('../controllers/patient');
const {
    siginupValidator,
    verifyValidator,
    resendOtpValidator,
    loginValidator

}=require('../middlewares/validations');

const {unauthrized,Admin}=require('../middlewares/authorize')

const {
    Register,
    verifyOtp,
    resendOtp,
    Login,
    lognOut,
    Dashboard

}=require('../controllers/patient')

const router=require('express').Router();
router.post('/signup',siginupValidator,Register);

router.post('/verify',verifyValidator,verifyOtp);
router.post('/resendOtp',resendOtpValidator,resendOtp);

router.post('/login',loginValidator,Login);
router.post('/dashboard',unauthrized,Dashboard);
router.post('/lognout',unauthrized,lognOut);

module.exports=router