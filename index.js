require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const patientRoute=require('./routes/patient')
const session=require('express-session');
const {addWeeks}=require('date-fns')
const port=process.env.PORT || 2000;
const cors=require('cors')
const sessionStore=require('connect-mongo')



const app=express()

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB connected successfuly !');
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
})


app.use(express.json());
// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     allowedHeaders: "Content-Type, Authorization",
//     credentials:true,
//     methods:['GET','POST','PUT','PUCH','DELETE']
// }))

app.use(session({
    secret:process.env.SESSION_SECURITY,
    resave:false,
    saveUninitialized:false,
    store:sessionStore.create({
        mongoUrl:process.env.DB_URL
    }),
    cookie:{
        secure:false,
        httpOnly:false,
        maxAge:1000*60*60*24*7
    }
}))



app.use('/api/patient',patientRoute)

app.use((error,req,res,next)=>{
    return res.status(500).json({Error:error.message || 'Something went wronge'})
});





