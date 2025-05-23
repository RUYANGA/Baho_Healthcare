const {
    siginupValidator,
    verifyValidator,
    resendOtpValidator,
    loginValidator,
    updatePatientValidation,
    forgetPasswordValidation,
    resetPasswordValidation

}=require('../middlewares/validations');

const {unauthrized,Admin}=require('../middlewares/authorize')

const {
    Register,
    verifyOtp,
    resendOtp,
    Login,
    lognOut,
    Dashboard,
    updateUser,
    forgetPassword,
    resetPassword

}=require('../controllers/patient');
const Upload = require('../middlewares/uploadFiles');

const router=require('express').Router();
router.post('/signup',siginupValidator,Register);

router.post('/verify',verifyValidator,verifyOtp);
router.post('/resendOtp',resendOtpValidator,resendOtp);

router.post('/login',loginValidator,Login);
router.post('/forget-password',forgetPasswordValidation,forgetPassword);
router.post('/reset-password/:token',resetPasswordValidation,resetPassword)
router.get('/dashboard',unauthrized,Dashboard);
router.post('/lognout',unauthrized,lognOut);
router.post('/update',unauthrized,updatePatientValidation,Upload.single('image'),updateUser);

module.exports=router