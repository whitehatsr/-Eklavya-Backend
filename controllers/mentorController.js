import AppError from "../utils/appError.js";
import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel.js'
import Request from "../models/requestModel.js";

const getMentors= catchAsync(async(req,res,next)=>{
    
    const approvedReq= await Request.find({
        menteeId: req.user._id
    })

    // console.log(approvedReq)

    const mentorIdSet= new Set()

    approvedReq.forEach((req)=>
        mentorIdSet.add(req.mentorId.toString())
    )


    let mentors= await User.find({ role: 'mentor' })

    mentors = mentors.filter((mentor)=>{
        return !mentorIdSet.has(mentor._id.toString())
    })

    res.send({ mentors })
})

const getAllRequestsOnMentor= catchAsync(async(req,res,next)=>{

    let myRequests= await Request.find({ mentorId: req.user._id , status: "pending"})

    myRequests= myRequests.map(async (req)=>{
        const { menteeId }= req;

        let menteeInfo= await User.findById(menteeId)
        
        menteeInfo.password= undefined;

        return ({ status: req.status , requestId: req._id  , menteeInfo})
    })


    myRequests = await Promise.all(myRequests)

    // console.log(myRequests)

    res.send({myRequests})
})

const getMyMentors= catchAsync(async(req,res,next)=>{

    const approvedReq= await Request.find({
        menteeId: req.user._id,
        status: "approved"
    })

    let myMentors= approvedReq.map(async (req)=>{

        const mentorId= req.mentorId;

        const mentor= await User.findById(mentorId)

        mentor.password=undefined;

        return mentor;
    })

    myMentors = await Promise.all(myMentors)

    res.send(myMentors)
})

export {
getMentors,
getAllRequestsOnMentor,
getMyMentors
}