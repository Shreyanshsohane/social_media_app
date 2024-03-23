import './rightbar.css'
import Online from '../online/Online.jsx'
import { Users } from '../../dummyData.js'
import CustomReactQuery from '../../utils/fetch_API.js';
import Link from "react"

const Rightbar = ({ user }) => {

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="assets/gift.jpeg" alt="" className='birthdayImg' />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b>  have a birthday today.
                    </span>
                </div>
                <img src="/assets/drawing_room.jpg" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users.map((u) => (<Online key={u.id} user={u} />))
                    }
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        const { data, error, loading } = CustomReactQuery(`http://localhost:8000/api/users/friends/${user._id}`)

        const PF = process.env.REACT_APP_PUBLIC_FOLDER
        // console.log(data)
        return (
            <>
                <h4 className='rightbarTitle'>User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City :</span>
                        <span className="rightbarInfoValue">{user?.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From :</span>
                        <span className="rightbarInfoValue">{user?.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship :</span>
                        <span className="rightbarInfoValue">{user?.relationship}</span>
                    </div>

                </div>
                <h4 className="rightbarTitle">User friends</h4>
        
                    <div className="rightbarFollowings">
                        {
                            data?.map((friend) => (
                                <div className="rightbarFollowing">
                                    <img src={friend?.profilePicture ? friend.profilePicture : PF + "/profile/Katherine.jpeg"} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">{friend?.username ? friend.username : ''}</span>
                                </div>
                            ))}
                    </div>
        
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}

export default Rightbar