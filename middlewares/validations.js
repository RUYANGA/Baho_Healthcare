const { body }=require('express-validator')
const Patient=require('../modeles/Patient');
const Doctor = require('../modeles/Doctor');



const siginupValidator=[
    body('Fname')
    .notEmpty()
    .withMessage('email requie')
    .isAlpha()
    .isLength({min:3})
    .trim()
    .escape()
    .withMessage('First name must be atleast 3 characters!'),
    body('Lname')
    .notEmpty()
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

const doctorSignup=[
    body('Fname')
    .notEmpty()
    .withMessage('email requie')
    .isAlpha()
    .isLength({min:3})
    .trim()
    .escape()
    .withMessage('First name must be atleast 3 characters!'),
    body('Lname')
    .notEmpty()
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
    // body('phone')
    // .notEmpty()
    // .isNumeric()
    // .withMessage('Phone number is required')
];

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




module.exports={siginupValidator,verifyValidator,resendOtpValidator,loginValidator,updatePatientValidation}
