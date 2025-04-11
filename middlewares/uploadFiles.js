const multer=require('multer')

//fuction to define storage of files
const Filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'image')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString()+ '-'+ file.originalname)
    }
})

//function to validate files type
const Fileformat=(req,file,cb)=>{
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'


    ){
        cb(null,true)
    }else{
        cb(new Error('Only images are allowed!'),false)
    }
}

//valiable to handle file uploads
const Upload=multer({storage:Filestorage,fileFilter:Fileformat});


module.exports=Upload