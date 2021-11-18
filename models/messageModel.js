import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
{
    from:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message:{
        type: String
    }
}
)

const Message = mongoose.model('Message', messageSchema)

export default Message; 
