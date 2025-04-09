const mongoose=require('mongoose');



const apointmentSchem= new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true
      },
    time: {
        type: String,
        required: true
      },
    discription:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports=mongoose.model('Apointment',apointmentSchem)