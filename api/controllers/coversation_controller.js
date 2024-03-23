import { json } from "express";
import Conversation from "../models/conversation_model.js"


export const newConversation = async (req, res) => {

    const newConversation = new Conversation({
        member :[req.body.senderId ,req.body.recieverId]
    }) ;

    try{
        const savedConversation =await newConversation.save() ;
        res.status(200).json(savedConversation)
    }
    catch(err){console.log(err)} ;
    
}

export const getConversation = async(req,res) =>{
    try{
        const conversation = await Conversation.find({
            member: {$in: [req.params.userId]}
        })
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err)
    }
}