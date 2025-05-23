
const { body }=require('express-validator')
const Patient=require('../modeles/Patient');
const Doctor = require('../modeles/Doctor');


//middleware to validate patient sign up

const siginupValidator=[
    body('Fname')
    .notEmpty()
    .isString()
    .withMessage('email requie')
    .isLength({min:3})
    .trim()
    .escape()
    .withMessage('First name must be atleast 3 characters!'),
    body('Lname')
    .notEmpty()
    .isString()
    .isLength({min:3})
    .withMessage('Last name must be atleast 3 character!')
    .toUpperCase()
    .trim()
    .escape(),
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .withMessage('Email is required')
    .toLowerCase()
    .trim()
    .escape()
    .withMessage('Provide a valid email format')
    .custom((email,{req})=>{
        return Patient.findOne({Email:email})
        .then(user=>{
            if(user){
                return Promise.reject(
                    'User with email taken , choose another one'
                )
            }
        })
    }),
    body('Password')
    .notEmpty()
    .isLength({min:5})
    .trim()
    .escape()
    .withMessage('Password must be contain character , numbers ,symbol and 8 length')
];

//middlewares to validate doctor registrations

const doctorSignup=[
    body('Fname')
    .notEmpty()
    .withMessage('email requie')
    .isString()
    .isLength({min:3})
    .trim()
    .escape()
    .withMessage('First name must be atleast 3 characters!'),
    body('Lname')
    .notEmpty()
    .isString()
    .isLength({min:3})
    .withMessage('Last name must be atleast 3 character!')
    .toUpperCase()
    .trim()
    .escape(),
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .withMessage('Email is required')
    .toLowerCase()
    .trim()
    .escape()
    .withMessage('Provide a valid email format')
    .custom((email,{req})=>{
        return Doctor.findOne({Email:email})
        .then(user=>{
            if(user){
                return Promise.reject(
                    'User with email taken , choose another one'
                )
            }
        })
    }),
    body('Password')
    .notEmpty()
    .isLength({min:5})
    .trim()
    .escape()
    .withMessage('Password must be contain character , numbers ,symbol and 8 length'),
    body('phone')
    .notEmpty()
    .isNumeric()
    .withMessage('Phone number is required'),
    body('BirthDate')
    .notEmpty()
    .escape()
    .withMessage('Birth date required'),
    body('provence')
    .notEmpty()
    .escape()
    .isString()
    .isLength({min:3})
    .withMessage('Provence required and 3 character'),
    body('Spectialisation')
    .notEmpty()
    .escape()
    .isAlpha()
    .isLength({min:2})
    .withMessage('Specialisation required '),
    body('currentEmployer')
    .notEmpty()
    .escape()
    .isString()
    .isLength({min:3})
    .withMessage('Current Employee required!'),
    body('priviousEmployer')
    .notEmpty()
    .isString()
    .isLength({min:3})
    .escape()
    .withMessage('Privious employee required'),
    body('gradYear')
    .notEmpty()
    .escape()
    .withMessage('Provide graduation year!'),
    body('medSchool')
    .notEmpty()
    .isString()
    .escape()
    .withMessage('Medical shool is required')



    
];


//middlewares to varidate  patient verification otp code

const verifyValidator=[
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .toLowerCase()
    .trim()
    .escape()
    .withMessage('Provide valid email format')
    .custom(async(email,{req})=>{
        return Patient.findOne({Email:email})
            .then(user=>{
                if(!user){
                    return Promise.reject(
                        'User with email not found!'
                        
                    )
                }else if(user.isVerified){
                    return Promise.reject(
                        'Email already verified'
                    )
                }
            })
        
    }),
    body('Otp')
    .notEmpty()
    .escape()
    .withMessage('Otp required!'),
   
];

//middleware to validate doctor verification otp code

const verifyDoctorValidator=[
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .toLowerCase()
    .trim()
    .escape()
    .withMessage('Provide valid email format')
    .custom(async(email,{req})=>{
        return Doctor.findOne({Email:email})
            .then(user=>{
                if(!user){
                    return Promise.reject(
                        'User with email not found!'
                        
                    )
                }else if(user.isVerified){
                    return Promise.reject(
                        'Email already verified'
                    )
                }
            })
        
    }),
    body('Otp')
    .notEmpty()
    .escape()
    .withMessage('Otp required!'),
   
];


//middleware to validate resend otp code of pantients

const resendOtpValidator=[
    body('Email')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .toLowerCase()
    .trim()
    .escape()
    .withMessage('Provide valid email format')
    .custom((value,{req})=>{
        return Patient.findOne({Email:value})
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'User with emaill not found'
                )
            }else if(user.isVerified){
                return Promise.reject(
                    'Email already verified'
                )
            }
        })
    })
];

//middleware to validate resend otp code of doctor

const resendOtpDoctorValidator=[
    body('Email')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .toLowerCase()
    .trim()
    .escape()
    .withMessage('Provide valid email format')
    .custom((value,{req})=>{
        return Doctor.findOne({Email:value})
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'User with emaill not found'
                )
            }else if(user.isVerified){
                return Promise.reject(
                    'Email already verified'
                )
            }
        })
    })
];

//middleware to validate login patient 

const loginValidator=[
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .escape()
    .withMessage('Provide valid email format')
    .custom((value,{req})=>{
        return Patient.findOne({Email:value})
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'Email or password incorect!'
                );
            }else if(!user.isVerified){
                return Promise.reject(
                    'Email is not varified!'
                );
            }
        })
    }),
    body('Password')
    .notEmpty()
    .trim()
    .withMessage('Provide password!')
];


//middleware to validate login doctor

const loginDoctorValidator=[
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .escape()
    .withMessage('Provide valid email format')
    .custom((value,{req})=>{
        return Doctor.findOne({Email:value})
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'Email or password incorect!'
                );
            }else if(!user.isVerified){
                return Promise.reject(
                    'Email is not varified!'
                );
            }
        })
    }),
    body('Password')
    .notEmpty()
    .trim()
    .withMessage('Provide password!')
];

//middleware to validate forget password

const forgetPasswordValidation=[
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .toLowerCase()
    .custom((value,{req})=>{
        return Patient.findOne({Email:value})
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'User with email not found!'
                )
            }else if(!user.isVerified){
                return Promise.reject(
                    'Email is not verified!'
                )
            }
        })
    })
]

//middleware to validate reset password 

const resetPasswordValidation=[
    body('Email')
    .notEmpty()
    .normalizeEmail()
    .toLowerCase()
    .escape()
    .custom((value,{req})=>{
        return Patient.findOne({Email:value})
        .then(user=>{
            if(!user){
                return Promise.reject(
                    'User with email not found!'
                )
            }else if(!user.isVerified){
                return Promise.reject(
                    'Email is not verified!'
                )
            }
        })
    }),
    body('Password')
    .notEmpty()
    .trim()
    .withMessage('Please enter password!')
]


//middleware to validate update patient 
const updatePatientValidation=[
    body('Fname')
    .trim()
    .escape(),
    body('Lname')
    .toUpperCase()
    .trim()
    .escape(),
    body('Email')
    .escape(),
    body('Password')
    .trim()
    .escape()
]


//middleware to validate new appointments

const newApointmentValidation=[
    body('reason')
    .notEmpty()
    .escape()
    .withMessage('Please privide reason of apointment'),
    body('discription')
    .notEmpty()
    .escape()
    .isLength({min:3})
    .withMessage('Provide discriptions of apointment!'),
    body('date')
    .notEmpty()
    .escape()
    .isDate()
    .withMessage('Provide date'),
    body('time')
    .notEmpty()
    .escape()
    .isTime()
    .withMessage('Provide time')
]



//export of all functions

module.exports={siginupValidator,verifyValidator,resendOtpValidator,loginValidator,updatePatientValidation,forgetPasswordValidation,resetPasswordValidation,doctorSignup,verifyDoctorValidator,loginDoctorValidator,newApointmentValidation}
