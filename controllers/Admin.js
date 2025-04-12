const Patient=require('../modeles/Patient');
const Doctor=require('../modeles/Doctor');
const Apointment=require('../modeles/Apointment');
const {validationResult}=require('express-validator');


const showPatient=async(req,res,next)=>{

    const admin=req.session.user._id

    const patient=await Patient.find()

}

const showDoctors=async(req,res,next)=>{

}


module.exports={showDoctors,showPatient}