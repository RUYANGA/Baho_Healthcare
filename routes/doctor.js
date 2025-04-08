const {
    siginupValidator,
    verifyDoctorValidator,
    resendOtpDoctorValidator,
    loginDoctorValidator,
    updatePatientValidation,
    siginupDoctorValidator,
    doctorSignup

}=require('../middlewares/validations');

const Upload=require('../middlewares/uploadFiles');

const {unauthrized,Admin}=require('../middlewares/authorize');

const { Register,Login ,verifyOtp,resendOtp}=require('../controllers/doctor');

const router=require('express').Router();
router.post('/signup',doctorSignup,Upload.single('image'),Register);

router.post('/verify',verifyDoctorValidator,verifyOtp);
router.post('/resendOtp',loginDoctorValidator,resendOtp);

router.post('/login',loginDoctorValidator,Login);
// router.post('/dashboard',unauthrized,Dashboard);
// router.post('/lognout',unauthrized,lognOut);
// router.post('/update',unauthrized,updatePatientValidation,updateUser);

module.exports=router