const Patient=require('../modeles/Patient');
const {validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
const {addMinutes}=require('date-fns');
const crypto=require('crypto');
const path=require('path');
const {transipoter}=require('../middlewares/nodemailer');





const Register=async(req,res,next)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const formatError=errors.array().map(err=>({
                message:err.msg
            }))
            return res.status(500).json({error:formatError});
        }
        const {Fname,Lname,Email,Password}=req.body

        const hashPassword= await bcrypt.hash(Password,12);
        const otp=crypto.randomInt(100000,999999).toString()
        const currentDate=new Date();
        const otpExpired=addMinutes(currentDate,15);

        const user=await Patient.create({
            Fname,
            Lname,
            Email,
            Password:hashPassword,
            Otp:otp,
            otpExpired
        })
      
        await transipoter.sendMail({
            from:'BAHO HEALTH',
            to:Email,
            subject:'OTP VERIFICATION',
            html:` <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome Email</title>
           <link href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                  <!-- Header -->
                  <div style="background-color: #4A90E2; padding: 24px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 26px;">Welcome to BAHO Healthcare</h1>
                  </div>
                  
                  <!-- Content -->
                  <div style="padding: 24px; line-height: 1.6;">
                    <p style="margin-top: 0; color: #333333; font-size: 16px;">Hello ${Fname},</p>
                    
                    <p style="color: #333333; font-size: 16px;">Thank you for signing up! We're excited to have you on board.</p>
                    
                    <p style="color: #333333; font-size: 16px;">Here are verification code to help you get started this code expired in 15 minutes:</p>
                    
                   
                    
                    <div style="margin: 30px 0; text-align: center;">
                      <h1 style="background-color: #4A90E2; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">${otp}</h1>
                    </div>
                    
                    <p style="color: #333333; font-size: 16px;">If you have any questions, just reply to this email. We're always here to help!</p>
                    
                    <p style="color: #333333; font-size: 16px;">Best regards,<br>Merci RUYANGA</p>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background-color: #f4f4f4; padding: 24px; text-align: center;">
                    <p style="margin: 0; color: #777777; font-size: 14px;">
                      © 2025 Your Company. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0; color: #777777; font-size: 14px;">
                      <a href="#" style="color: #777777; text-decoration: underline;">Unsubscribe</a> |
                      <a href="#" style="color: #777777; text-decoration: underline;">Privacy Policy</a>
                    </p>
                    <div style="margin-top: 20px;">
                      <a href="https://www.facebook.com/ruyanga.merci.1" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                      
                        Facebook
                      </a>
                      <a href="https://x.com/RuyangaM" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                        X-twitter
                      </a>
                      <a href="https://github.com/RUYANGA" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                        Github
                      </a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
           <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>`
        })
        res.status(200).json({message:'User register successfully'});

    } catch (error) {
        const errors=new Error(error);
        errors.statusCode=500;
        return next(errors)
    }
}

const verifyOtp=async(req,res,next)=>{
  try {

        const {Email,Otp}=req.body;

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const errorFormat=errors.array().map(err=>({
                message:err.msg
            }))
            return res.status(400).json({error:errorFormat})
        }
      
       
        const patient=await Patient.findOne({Email:Email});
        if(patient.Otp !==Otp || patient.otpExpired < new Date()){
            return res.status(400).json({message:"Otp expired or invalid !"});
        } 

        patient.Otp=undefined;
        patient.otpExpired=undefined;
        patient.isVerified=true
        await patient.save()

        res.status(200).json({message:"Email is verified successfuly. Now you can login"});

  } catch (error) {

        const err=new Error(error);
        err.status=500
        next(err)

  }
}




const resendOtp=async(req,res,next)=>{
  try {

       const {Email}=req.body;

       const errors=validationResult(req);
       if(!errors.isEmpty()){
           const errorFormat=errors.array().map(err=>({
               message:err.msg
           }))
           return res.status(400).json({error:errorFormat})
       }

       const user=await Patient.findOne({Email:Email})
       const otp=crypto.randomInt(100000,999999);
       const currentDate=new Date();
       const otpExpired=addMinutes(currentDate,15);

       user.Otp=otp;
       user.otpExpired=otpExpired;
       await user.save();

       await transipoter.sendMail({
           from:process.env.EMAIL,
           to:Email,
           subject:'OTP VERIFICATION CODE',
           html:` <!DOCTYPE html>
           <html>
           <head>
           <meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Welcome Email</title>
           <link href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
           </head>
           <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
           <table role="presentation" style="width: 100%; border-collapse: collapse;">
               <tr>
               <td style="padding: 0;">
                   <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                   <!-- Header -->
                   <div style="background-color: #4A90E2; padding: 24px; text-align: center;">
                       <h1 style="color: #ffffff; margin: 0; font-size: 26px;">Welcome to BAHO Healthcare</h1>
                   </div>
                   
                   <!-- Content -->
                   <div style="padding: 24px; line-height: 1.6;">
                       <p style="margin-top: 0; color: #333333; font-size: 16px;">Hello 👋 ${user.Lname},</p>
                       
                       <p style="color: #333333; font-size: 16px;">Thank you for signing up! We're excited to have you on board.</p>
                       
                       <p style="color: #333333; font-size: 16px;">Here are verification code  to help you get started this code expired in 15 minutes:</p>
                       
                   
                       
                       <div style="margin: 30px 0; text-align: center;">
                       <h1 style="background-color: #4A90E2; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">${otp}</h1>
                       </div>
                       
                       <p style="color: #333333; font-size: 16px;">If you have any questions, just reply to this email. We're always here to help!</p>
                       
                       <p style="color: #333333; font-size: 16px;">Best regards,<br>Merci RUYANGA</p>
                   </div>
                   
                   <!-- Footer -->
                   <div style="background-color: #f4f4f4; padding: 24px; text-align: center;">
                       <p style="margin: 0; color: #777777; font-size: 14px;">
                       © 2025 Your Company. All rights reserved.
                       </p>
                       <p style="margin: 10px 0 0; color: #777777; font-size: 14px;">
                       <a href="#" style="color: #777777; text-decoration: underline;">Unsubscribe</a> |
                       <a href="#" style="color: #777777; text-decoration: underline;">Privacy Policy</a>
                       </p>
                       <div style="margin-top: 20px;">
                       <a href="https://www.facebook.com/ruyanga.merci.1" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                       
                           <i class="bi bi-facebook"></i>
                       </a>
                       <a href="https://x.com/RuyangaM" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                           <i class="bi bi-twitter-x"></i>
                       </a>
                       <a href="https://github.com/RUYANGA" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                           <i class="bi bi-github"></i>
                       </a>
                       </div>
                   </div>
                   </div>
               </td>
               </tr>
           </table>
           <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
           </body>
           </html>`
       })
   res.status(201).json({message:"Otp resend successfully!"});

  } catch (error) {

       const err=new Error(error);
       err.status=500,
       next(err)
  }
}
const Login=async(req,res,next)=>{

  try {
      const {Email,Password}=req.body;

      const errors=validationResult(req);
      if(!errors.isEmpty()){
          const errorFormat=errors.array().map(err=>({
              message:err.msg
          }))
          return res.status(400).json({error:errorFormat});
      };

      const patient =await Patient.findOne({Email:Email});

      if(!await bcrypt.compare(Password,patient.Password)){
         return res.status(401).json({message:'Email or password incorect!'});
      };
      req.session.user=patient
      res.status(200).json({message:'Login successfully!',user:{
        _id:patient._id,
        email:patient.Email,
        firstName:patient.Fname
      }});

  } catch (error) {

          const err=new Error(error);
          err.status=500,
          next(err)
  }
  
};

const forgetPassword=async(req,res,next)=>{
  try {
        const {Email}=req.body;

      const errors=validationResult(req);
      if(!errors.isEmpty()){
          const errorFormat=errors.array().map(err=>({
              message:err.msg
          }))
          return res.status(400).json({error:errorFormat});
      };

      const token= crypto.randomBytes(32).toString('hex');

      const patient=await Patient.findOne({Email:Email})

      transipoter.sendMail({

        from:process.env.EMAIL,
        to:Email,
        subject:'RESET PASSWORD',
        html:` <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
        <link href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
            <td style="padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- Header -->
                <div style="background-color: #4A90E2; padding: 24px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 26px;">WElcome to BAHO Healthcare</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 24px; line-height: 1.6;">
                    <p style="margin-top: 0; color: #333333; font-size: 16px;">Hello 👋 ${patient.Lname},</p>
                    
                    <p style="color: #333333; font-size: 16px;">Thank you for choosing us ! We're excited to have you on board.</p>
                    
                    <p style="color: #333333; font-size: 16px;">Here are reset password link  to help you rest your password this link expired in 30 minutes:</p>
                    
                
                    
                    <div style="margin: 30px 0; text-align: center;">
                    <h1 style="background-color: #4A90E2; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;"><a style="color: #ffffff; " href='http://localhost:2000/reset-password/${token}'>Reset password</a></h1>
                    </div>
                    
                    <p style="color: #333333; font-size: 16px;">If you have any questions, just reply to this email. We're always here to help!</p>
                    
                    <p style="color: #333333; font-size: 16px;">Best regards,<br>Merci RUYANGA</p>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #f4f4f4; padding: 24px; text-align: center;">
                    <p style="margin: 0; color: #777777; font-size: 14px;">
                    © 2025 Your Company. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0; color: #777777; font-size: 14px;">
                    <a href="#" style="color: #777777; text-decoration: underline;">Unsubscribe</a> |
                    <a href="#" style="color: #777777; text-decoration: underline;">Privacy Policy</a>
                    </p>
                    <div style="margin-top: 20px;">
                       <a href="https://www.facebook.com/ruyanga.merci.1" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                       
                           <i class="bi bi-facebook"></i>
                       </a>
                       <a href="https://x.com/RuyangaM" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                           <i class="bi bi-twitter-x"></i>
                       </a>
                       <a href="https://github.com/RUYANGA" style="display: inline-block; margin: 0 10px; color: #4A90E2;">
                           <i class="bi bi-github"></i>
                       </a>
                       </div>
                </div>
                </div>
            </td>
            </tr>
        </table>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>`

      })

      const currentDate=new Date();
      const tokenExpired=addMinutes(currentDate,30);

      patient.token=token;
      patient.tokenExpired=tokenExpired;
      await patient.save()

      res.status(200).json({message:`Rest password link sent to ${Email}`})

    } catch (error) {
      const errors= new Error(error);
      errors.statusCode=500;
      return next(errors);
  }

};


const resetPassword=async(req,res,next)=>{
 try {
    const token=req.params.token;
    const {Email,Password}=req.body;

    const patient=await Patient.findOne({Email:Email})

    if(patient.tokenExpired < new Date() || patient.token !==token){
      return res.status(404).json({message:'Token invalid or expired!'})
    }
    const hashPassword=await bcrypt.hash(Password,12);

    patient.token=undefined;
    patient.token=undefined;
    patient.Password=hashPassword;
    await patient.save()

    res.status(201).json({message:'Password reset successfully!'})

 } catch (error) {
      const errors= new Error(error);
      errors.statusCode=500;
      return next(errors);
 }
}


const lognOut=async(req,res,next)=>{
  try {
      
      req.session.destroy((err)=>{
          if(err)return res.status(500).json({message:'Error to logn out'});
      })
      res.clearCookie('connect.sid');
      res.status(200).json({message:"Logn out successfuly"})

  } catch (error) {

    const errors= new Error(error);
    errors.statusCode=500;
    return next(errors);
  }
};


const updateUser=async(req,res,next)=>{
  try {
      
       const {Fname,Lname,Email,Password}=req.body;
       const errors=validationResult(req);
       const imageUrl=req.file.path
       if(!errors.isEmpty()){
           const errorFormat=errors.array().map(err=>({
               message:err.msg
           }))
           return res.status(400).json({error:errorFormat});
       };

       let image

 
       
       const id=req.session.user._id;
       if(!id)return res.status(400).json({message:'User id required'});
       const user=await Patient.findById({_id:id})
       if(!user)return res.status(404).json({message:'User not found'});
       let hashPassword
       if(Password){
          hashPassword=await bcrypt.hash(Password,10);
       };

       
       if(imageUrl){
          await Patient.findByIdAndUpdate({_id:id},{$set:{image:imageUrl}})
       }
       
       let userSave;
       try {
           userSave=await Patient.findByIdAndUpdate({_id:id},{$set:{Fname:Fname? Fname:user.Fname,Lname:Lname ? Lname:user.Lname,Email:Email ? Email:user.Email,Password:Password ? hashPassword:user.Password}},{new:true});
       } catch (error) {
         const errors= new Error(error);
         errors.statusCode=500;
         return next(errors);
       } ;

       res.status(200).json({User:'User updated successfully!, please check your dashboard'});

  } catch (error) {

     const errors= new Error(error);
     errors.statusCode=500;
     return next(errors);
  }
};

const Dashboard=async(req,res,next)=>{

  const user=await Patient.find({_id:req.session.user._id}).populate('Doctor');
  if(!user)return res.status(400).json({message:"User not found"});
 

  res.status(200).json({Dashboard:user})
}


module.exports={Register,verifyOtp,resendOtp,Login ,lognOut,Dashboard,updateUser,forgetPassword,resetPassword}