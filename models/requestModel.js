import mongoose from 'mongoose'

const requestSchema = mongoose.Schema(
{
    mentorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    menteeId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status:{
        type: String,
        default: "pending"
    }
}
)

const Request = mongoose.model('Request', requestSchema)

export default Request; 
