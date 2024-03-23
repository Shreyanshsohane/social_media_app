import Post from "../post/Post.jsx"
import Share from "../share/Share.jsx"
import "./feed.css"
import { Posts } from "../../dummyData.js"
import CustomReactQuery from "../../utils/fetch_API.js"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.js"

const Feed = ({ username }) => {


    
    const {user} = useContext(AuthContext) ;

    const { data, error, loading } = CustomReactQuery(username
        ? "http://localhost:8000/api/post/profile/" + username
        : "http://localhost:8000/api/post/timeline/" + user._id);
    // console.log(data) ;
    // console.log(username)
    return (
        <div className="feed">
            <div className="feeedWrapper">
                <Share />
                {
                    data.map((p) => (<Post key={p._id} post={p} />))
                }
            </div>
        </div>

    )
}

export default Feed 