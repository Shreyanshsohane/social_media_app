import "./post.css"
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import CustomReactQuery from "../../utils/fetch_API";

import { format, fromat } from "timeago.js"

import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Post = ({ post }) => {


    // console.log(post);
    const { data, error, loading } = CustomReactQuery(`http://localhost:8000/api/users/?userId=${post.userId}`)

    // console.log(data) ;

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const {user: currentUser} = useContext(AuthContext)

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id, post.likes])

    const handleLike = () => {
        try{
            axios.put("/post/" +post._id + "/like" ,{userId :currentUser._id})
        }
        catch(err)
        {
            console.log(err) ;
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked);
    }

    return (
        // <div className=""></div>
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${data.username}`}>

                            <img
                                className="postProfileImg"
                                src={data.profilePicture ?data.profilePicture : PF + "/profile/Katherine.jpeg"}
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">{data.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="posTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={post.img || PF + ''} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={PF + "/like.jpg"} alt="" onClick={handleLike} />
                        <img className="heartIcon" src={PF + "/heart.png"} alt="" onClick={handleLike} />
                        <span className="postLikeCounter">{like} people liked</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"> comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;