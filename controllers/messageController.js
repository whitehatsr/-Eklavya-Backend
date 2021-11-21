import AppError from "../utils/appError.js";
import catchAsync from '../utils/catchAsync.js';
import Message from "../models/messageModel.js";

const getMessages= catchAsync(async(req,res,next)=>{

    const from= req.user._id;
    const to= req.params.userId;
    
    const messages = await Message.find( { $or:[ {'from':from , 'to': to}, {'from': to , 'to': from } ]} )

    res.send(messages)
})

const sendMessage= catchAsync(async(req,res,next)=>{

    const from= req.user._id;
    const to= req.params.userId;
    
    const { message }= req.body

    const messages = Message.create({
        from,
        to,
        message
    })

    res.send("Message sent sucessfully")
})


export {
getMessages,
sendMessage
}