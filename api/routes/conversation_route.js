import express from "express"
import Conversation from "../models/conversation_model.js";
import { getConversation, newConversation } from "../controllers/coversation_controller.js";


const router = express.Router() 

router.post("/", newConversation)

router.get("/:userId" , getConversation)

export default router ;