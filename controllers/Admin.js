const Patient=require('../modeles/Patient');
const Doctor=require('../modeles/Doctor');
const Apointment=require('../modeles/Apointment');
const {validationResult}=require('express-validator');


const showPatient=async(req,res,next)=>{

   try {
        const admin=req.session.user._id

        const patients=await Patient.find()
 
   } catch (error) {
    
   }
}

const showDoctors=async(req,res,next)=>{
    const admin=req.session.user._id

    const doctors=await Doctor.find()

}


module.exports={showDoctors,showPatient}