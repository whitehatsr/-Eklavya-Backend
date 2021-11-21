import AppError from "../utils/appError.js";
import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel.js'
import Request from "../models/requestModel.js";
import mongoose from 'mongoose'

const createRequest= catchAsync(async(req,res,next)=>{

    const mentee= req.user;
    const { mentorId } = req.params;

    const mentor= await User.findById(mentorId);

    await Request.create({
        mentorId: mentor._id,
        menteeId: mentee._id
    })
    
    res.send("Connect Request Send")
})

const setRequestStatus=catchAsync(async(req,res,next)=>{

    const { status } = req.body;
    const { requestId } = req.params

    const request=await Request.findOne({ mentorId: req.user._id , _id: requestId })

    if(!request)
    {
        return next(new AppError('Request not fonund',404))
    }

    request.status= status;
    await request.save();
    
    res.send("Request status changed")
}) 

export {
    createRequest,
    setRequestStatus
}