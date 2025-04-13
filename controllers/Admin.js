const Patient=require('../modeles/Patient');
const Doctor=require('../modeles/Doctor');
const Apointment=require('../modeles/Apointment');
const {validationResult}=require('express-validator');


const showPatient=async(req,res,next)=>{

   try {
        const admin=req.session.user._id

        const errors=validationResult(req);
                if(!errors.isEmpty()){
                    const errorFormat=errors.array().map(err=>({
                        message:err.msg
                    }))
                    return res.status(400).json({error:errorFormat})
                }

        const patients=await Patient.find().sort({Fname:1})
        const count=await Patient.find().countDocuments()

        res.status(200).json({Total:count,getAllPatints:patients})
 
   } catch (error) {
    
   }
}

const showDoctors=async(req,res,next)=>{
    const admin=req.session.user._id

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const errorFormat=errors.array().map(err=>({
            message:err.msg
        }))
            return res.status(400).json({error:errorFormat})
    }

    const doctors=await Doctor.find().sort({Fname:-1})
    const countDoc=await Doctor.find().countDocuments()

    res.status(200).json({Docttors:doctors,total:countDoc})

}


module.exports={showDoctors,showPatient}