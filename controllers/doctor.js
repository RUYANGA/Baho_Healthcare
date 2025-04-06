const Doctor=require('../modeles/Doctor')
const path=require('path')
const {validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
const {addMinutes}=require('date-fns');
const crypto=require('crypto');
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
        const {Fname,Lname,Email,Password,phone,BirthDate,provence,Spectialisation,currentEmployer,priviousEmployer,gradYear,medSchool,LicenseImage,Language,Bio,Idimage}=req.body

        const imageUrl=req.file.path;

        const hashPassword= await bcrypt.hash(Password,12);
        const otp=crypto.randomInt(100000,999999).toString()
        const currentDate=new Date();
        const otpExpired=addMinutes(currentDate,15);

        const user=await Doctor.create({
            Fname,
            Lname,
            Email,
            phone,
            BirthDate,
            provence,
            Spectialisation,
            currentEmployer,
            priviousEmployer,
            gradYear,
            medSchool,
            LicenseImage:imageUrl,
            Password:hashPassword,
            otp,
            otpExpired
        })
      
        await transipoter.sendMail({
            from:'BAHO HEALTH',
            to:Email,
            subject:'OTP VERIFICATION',
            html:`
        <!DOCTYPE html>
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
                        X-Twitter
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
        res.status(200).json({message:'User register successfully',user});

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
      
       
        const doctor=await Doctor.findOne({Email:Email});
        if(doctor.otp !==Otp || doctor.otpExpired < new Date()){
            return res.status(400).json({message:"Otp expired or invalid !"});
        } 

        doctor.otp=undefined;
        doctor.otpExpired=undefined;
        doctor.isVerified=true
        await doctor.save()

        res.status(200).json({message:"Email is verified successfuly. Now you can login"});

  } catch (error) {

        const err=new Error(error);
        err.status=500
        next(err)

  }
}

