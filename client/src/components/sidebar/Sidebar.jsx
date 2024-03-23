import "./sidebar.css"
import { RssFeed ,Chat, PlayCircle , Group , Bookmarks ,QuestionMarkOutlined} from "@mui/icons-material"
import {Users} from '../../dummyData'
import CloseFriend from "../closeFriend/CloseFriend"

const Sidebar = () => {
    
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircle className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmarks className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <QuestionMarkOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                   {Users.map(u=>(
                    <CloseFriend key={u.id} user={u}/> 
                   ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar