const { fi } = require('date-fns/locale')
const multer=require('multer')


const Filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString()+ '-'+ file.originalname)
    }
})

const Fileformat=(req,file,cb)=>{
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'


    ){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const Upload=multer({storage:Filestorage,fileFilter:Fileformat});


module.exports=Upload