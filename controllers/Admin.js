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

        const patients=await Patient.find()

        res.status(200).json({getAllPatints:patients})
 
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

    res.status(200).json({Docttors:doctors})

}


module.exports={showDoctors,showPatient}