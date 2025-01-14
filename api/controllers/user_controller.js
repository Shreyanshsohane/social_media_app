import bcrypt from "bcrypt"
import User from "../models/user_model.js"

export const update =async(req,res)=>{
    if(req.body.userId === req.params.id  || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10) ;
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                console.log(err) ;
            }
        }

        try{
            const user =await User.findByIdAndUpdate(req.params.id,{
                $set : req.body
            }) ;
            res.status(200).json("Account has been updated")
        }
        catch(err){
            console.log(err) ;
        }
    }
    else{
        return res.status(403).json("You can only update your account") ;
    }
    
}




export const delet = async(req,res)=>{
    if(req.body.userId === req.params.id  || req.body.isAdmin){
        

        try{
            const user =await User.findByIdAndDelete( req.body.id) ;
            res.status(200).json("Account has been deleted")
        }
        catch(err){
            console.log(err) ;
        }
    }
    else{
        return res.status(403).json("You can only delete your account") ;
    } 
}


export const user =async (req,res)=>{
    const userId = req.query.userId ;
    const username = req.query.username;
    try{
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({username:username}) ;

        const {password,updatedAt, ...other} =user._doc
        res.status(200).json(other) 
    }
    catch(err){ 
        console.log(err)
    }
}

export const follow =async (req,res)=>{
    if(req.body.userId !==req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser =await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push :{followers: req.body.userId}}) ;
                await currentUser.updateOne({$push:{following: req.params.id}} ) ;
                res.status(200).json("user has been  followed");
            }
            else{
                res.status(403).json('you are already following this user');
            }
        }
        catch(err)
        {
            res.status(500).json(err) ;
        }
    }
    else{
        res.status(403).json("you cant follow yourself")
    }
}



export const unfollow =async (req,res)=>{
    if(req.body.userId !==req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser =await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull :{followers: req.body.userId}}) ;
                await currentUser.updateOne({$pull:{following: req.params.id}} ) ;
                res.status(200).json("user has been  unfollowed");
            }
            else{
                res.status(403).json('you dont follow this user');
            }
        }
        catch(err)
        {
            res.status(500).json(err) ;
        }
    }
    else{
        res.status(403).json("you cant unfollow yourself")
    }
}

export const getFriends = async (req,res) =>{
    try{
        const user =await User.findById(req.params.userId) ;
        const friends =await Promise.all(
            user.following.map(friendId =>{
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend=>{
            const {_id,username,profilePicture} =friend ;
            friendList.push({_id,username,profilePicture})
        }) ;
        res.status(200).json(friendList)
    }
    catch(err){
        res.status(500).json(err)
    }
}
