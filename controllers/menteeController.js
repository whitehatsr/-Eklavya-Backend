import Request from "../models/requestModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

const getMyMentees= catchAsync(async(req,res,next)=>{

    const approvedReq= await Request.find({
        mentorId: req.user._id,
        status: "approved"
    })

    let myMentees= approvedReq.map(async (req)=>{

        const menteeId= req.menteeId;

        const mentee= await User.findById(menteeId)

        mentee.password=undefined;

        return mentee;
    })

    myMentees = await Promise.all(myMentees)

    res.send(myMentees)
})

export {
getMyMentees
}