import express from "express"
import Message from "../models/Message_model.js";
import { addMessage, getMessage } from "../controllers/message_controller.js";


const router = express.Router() 

router.post("/",addMessage )

router.get("/:conversationId",getMessage)

export default router ;