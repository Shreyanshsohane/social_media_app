import Topbar from "../../components/topbar/Topbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"
import "./home.css" 
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.js"

const Home =() =>{
    
  const {user} = useContext(AuthContext)
    return (
        <div >
            <Topbar />
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </div>
    )
}

export default Home 