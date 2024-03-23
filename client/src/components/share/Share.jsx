import { useContext, useState } from "react"
import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext"
import { useRef } from "react"
import axios from "axios"

const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)

    const desc = useRef();
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault();
        // const newPost ={
        //     userId: user._id,
        //     desc: desc.current.value
        // }
        const newPost = new FormData();
        newPost.append("desc", desc.current.value);
        newPost.append("userId", user._id);
        if (file) {
            newPost.append("img", file);
        }

        console.log(newPost);
        try {
            await axios.post(`/post`, newPost)
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? user.profilePicture : PF + "/assets/profile/Laura_Marano.jpeg"} alt="" className="shareProfileImg" />
                    <input ref={desc} placeholder={`What's in your mind ${user.username}?`} className="shareInput" />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor="file">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                // style={{display :"none"}}
                                type="file"
                                name="" id="file"
                                accept=".png,.jpeg ,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share