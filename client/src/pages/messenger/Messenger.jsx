import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import CustomReactQuery from "../../utils/fetch_API";

import "./messenger.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import io from "socket.io-client"

const Messenger = () => {

    const { user } = useContext(AuthContext);
    const { data: conversation } = CustomReactQuery(`http://localhost:8000/api/conversations/${user._id}`)
    const scrollRef = useRef()
    const [currentChat, setCurrentChat] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()


    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        socket.on("getMessage", data => {

            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
            
        });
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            console.log(users)
        })
    }, [user])

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/messages/${currentChat._id}`);
                setMessages(res.data)
            } catch (err) {
                console.log(err);
            };
        }
        getMessage();
    }, [currentChat])


    // const { data: messages, error, loading } = CustomReactQuery(`http://localhost:8000/api/messages/${currentChat._id}`, [currentChat])
    // console.log(currentChat)
    // console.log(message)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }


        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });


        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("")
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {
                            conversation.map((c) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? (<><div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message message={m} own={m.sender === user._id} />
                                    </div>
                                ))}
                            </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something ..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}>
                                    </textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                </div></>) : (<span className="noConversationText">Open a Conversation to start a chat</span>)
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Messenger;