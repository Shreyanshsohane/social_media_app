import express from "express"
const app  = express();

import mongoose from "mongoose";
import dotenv from "dotenv" ;
import helmet from "helmet" ;
import morgan from "morgan";
import cors from "cors" ;



import  userRoute from './routes/users_route.js' ;
import  authRoute from './routes/auth_route.js';
import postRoute from './routes/post_route.js'
import conversationRoute from './routes/conversation_route.js'
import messageRoute from './routes/message_route.js'

dotenv.config() ;


const connect =async() =>{ 
    try{
        await mongoose.connect(process.env.MONGO_URL) ;
        console.log("MongoDB Connected");
    }
    catch(err){
        console.log("ll")
        throw err;
    }
}

app.use(express.json()) ;
app.use(helmet())
app.use(morgan('common'))
app.use(cors())


app.use("/api/users" , userRoute) ;
app.use("/api/auth", authRoute ) ;
app.use("/api/post" ,postRoute) ;
app.use("/api/conversations" , conversationRoute) ;
app.use('/api/messages', messageRoute) ;


app.listen(8000, () => {
    connect() ;
    console.log('Server is running on')
})