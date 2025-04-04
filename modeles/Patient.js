const mongoose=require('mongoose');


const userSchem=new mongoose.Schema({
    Fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    BirthDate:{
        type:Date
    },
    phone:{
        type:Number,
        //required:true
    },
    Doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    Otp:{
        type:String
    },
    otpExpired:{
        type:Date
    }
});


module.exports= mongoose.model('Patient',userSchem)