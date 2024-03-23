import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
     const friendId = conversation.member.find((m) =>m !==currentUser._id) ;

     const getUSer =async()=>{
      try{
        const res = await axios("/users?userId=" +friendId);
        console.log(res)
        setUser(res.data) ;
      }
      catch(err)
      {
        console.log(err);
      }
     }
     getUSer() ;
  },[currentUser ,conversation]) ;
  

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          
        user?.profilePicture ?user.profilePicture : 
        PF + "profile/Katherine.jpeg"
        }
        alt=""
      /> 
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}