import { useContext } from "react";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/register/Register.jsx";
import {BrowserRouter,Routes,Route ,Navigate} from "react-router-dom"
import { AuthContext } from "./context/AuthContext.js";
import Message from "./components/message/Message.jsx";
import Messenger from "./pages/messenger/Messenger.jsx";



function App() {

  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home/>: <Register/>} />
        <Route path= "/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path= "/register" element={user ? <Navigate to="/"/> : <Register/>} />
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path= "/messenger" element={!user ? <Navigate to="/"/> : <Messenger/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
