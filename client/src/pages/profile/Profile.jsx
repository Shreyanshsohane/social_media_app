import Topbar from "../../components/topbar/Topbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"

import './profile.css'
import CustomReactQuery from "../../utils/fetch_API.js"
import {useParams} from "react-router"

const Profile = () => {
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER 

    const username= useParams().username ;


    const { data, error, loading } = CustomReactQuery(`http://localhost:8000/api/users?username=${username}`)
    
    console.log(data) ;
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={data.coverPicture || PF+ "/garden.jpg"} className="profileCoverImg" alt="" />
                            <img src={data.profilePicture || PF+ "/profile/Katherine.jpeg"} className="profileUserImg" alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{data.username}</h4>
                            <h4 className="profileInfoDesc">{data.desc}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile 