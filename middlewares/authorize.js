
const unauthrized=async(req,res,next)=>{
    if(!req.session.user)return res.status(400).json({message:"Unauthorized. Please log in first."});
        return next()
}

const Admin = (req, res, next) => {
    if (!req.session.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. You are not an admin." });
    }
    next();
};



module.exports={unauthrized,Admin}