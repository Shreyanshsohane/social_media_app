import Post from "../models/post_model.js";
import User from "../models/user_model.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
export const create = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        console.log(req) ;
        const upload = await uploadOnCloudinary(req.file.path)
        newPost.img =upload.url ;
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        console.log(err)
    }
}

export const update = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post has been updated")
        } else {
            res.status(403).json("you can only update your post")
        }
    } 
    catch (err) {
        console.log(err);
    }
}

export const delet = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.deleteOne({ _id: req.params.id })          
            res.status(200).json("Post has been deleted")
        } else {
            res.status(403).json("you can only delete your post")
        }
    }
    catch (err) {
        console.log(err);
    } 
}

export const fetchPost = async (req, res) => {
    try {
        const post =await Post.findById(req.params.id) ;
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(post) ;
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post bas  been liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post  has been un-liked");
        }
    }
    catch (err) {
        res.status(500).json("error")
    }
}

export const timeline = async (req ,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId) ;
        const userPosts = await Post.find({userId :currentUser._id}) ;

        console.log(currentUser ) ;
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    }
    catch(err){
        res.status(500).json(err) ;
    }
}


export const allPost = async (req ,res)=>{
    try{
        const user = await User.findOne({username : req.params.username}) ;
        const posts=await Post.find({userId : user._id}) ;
       res.status(200).json(posts) ;
    }
    catch(err){
        res.status(500).json(err) ;
    }
}

