import User from "../models/user_model.js";
import bcrypt from "bcrypt" ;


export const register=  async (req,res)=>{ 
    try{
        const salt = await bcrypt.genSalt(10) ;
        const hashedPassword = await bcrypt.hash(req.body.password,salt) ;


        const newUser = new User({
            username : req.body.username ,
            email : req.body.email,
            password : hashedPassword
        }) ;

        const user =await newUser.save() ;
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
    }
}

export const login =async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email}) ;
        !user && res.status(404).json("user not found") ;

        const vaildPassword = await bcrypt.compare(req.body.password,user.password) ;
        !vaildPassword && res.status(400).json("wrong password") ;

        res.status(200).json(user)

    }catch(err){
        console.error(err);
    }
}
