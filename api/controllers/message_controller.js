import Message from "../models/Message_model.js";



export const addMessage = async (req,res)=>{
    const newMessage = new Message(req.body) ;

    try{
        const savedMesage =await newMessage.save()
        res.status(200).json(savedMesage)
    }
    catch(err){
        res.status(500).json(err) ;
    }

}

export const getMessage = async (req,res)=>{
    try{
        const message = await Message.find({
            conversationId: req.params.conversationId 
        })
        res.status(200).json(message)
    }
    catch(err){
        res.status(500).json(err);
    }
}