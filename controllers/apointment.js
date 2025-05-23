const Patient=require('../modeles/Patient');
const Doctor=require('../modeles/Doctor');
const Apointment=require('../modeles/Apointment');
const {validationResult}=require('express-validator');



const addApointments=async(req,res,next)=>{
    try {
        const patiantId=req.session.user._id;
        const doctorId=req.params.id;

        const patient=await Patient.findOne({_id:patiantId});
        const doctor=await Doctor.findOne({_id:doctorId});

        const{date,time,reason,discription}=req.body;

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const errorFormat=errors.array().map(err=>({
                message:err.msg
            }))
            return res.status(400).json({error:errorFormat})
        }

        const newApointment=await Apointment.create({
            doctor:doctorId,
            patient:patiantId,
            reason,
            discription,
            date,
            time

        });

        await Doctor.findByIdAndUpdate({_id:doctorId},{$set:{apointment:newApointment._id}},{new:true});
        await Patient.findByIdAndUpdate({_id:patiantId},{$set:{apointment:newApointment._id}},{new:true})

        res.status(201).json({message:'Apointment created successfully',Apointment:newApointment})

    } catch (error) {
        const err=new Error(error);
        err.status=500
        next(err)
    }
}


const updateApointments=async(req,res,next)=>{
    try {
        const patiantId=req.session.user._id;
        const apointmentId=req.params.apointmentId;
        const doctorId=req.params.id

           

        const{date,time,reason,discription}=req.body;

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const errorFormat=errors.array().map(err=>({
                message:err.msg
            }))
            return res.status(400).json({error:errorFormat})
        }

        const updateApointment=await Apointment.findByIdAndUpdate({_id:apointmentId},{$set:{reason:reason,discription:discription,date:date,time:time}});

        await Doctor.findByIdAndUpdate({_id:doctorId},{$set:{apointment:updateApointment._id}},{new:true});
        await Patient.findByIdAndUpdate({_id:patiantId},{$set:{apointment:updateApointment._id}},{new:true})

        res.status(201).json({message:'Apointment update successfully, chech your dashboard'})

    } catch (error) {
        const err=new Error(error);
        err.status=500
        next(err)
    }
}



module.exports={addApointments,updateApointments}