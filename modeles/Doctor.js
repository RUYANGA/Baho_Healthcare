const mongoose=require('mongoose');


const doctorSchema=new mongoose.Schema({
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
    phone:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    BirthDate:{
        type:Date,
        required:true
    },
    provence:{
        type:String,
        required:true
    },
    Spectialisation:{
        type:String,
        required:true
    },
    currentEmployer:{
        type:String,
        required:true
    },
    priviousEmployer:{
        type:String
    },
    gradYear:{
        type:String
    },
    medSchool:{
        type:String,
        required:true
    },
    LicenseImage:{
        type:String,
        //required:true
    },
    Language:{
        type:Array,
        required:true
    },
    Bio:{
        type:String,
        required:true
    },
    Idimage:{
        type:String,
        //required:true
    },
    Patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String
    },
    otpExpired:{
        type:Date
    },
    creatAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports= mongoose.model('Doctor',doctorSchema)