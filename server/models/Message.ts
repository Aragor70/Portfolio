import { Schema, model } from 'mongoose';

interface Message {
    from: string;
    email: string;
    text: string;
    subject: string;
    date: Date | undefined;
}

const MessageSchema = new Schema<Message>({

    from: {
        type: String,
        default: 'contact@anonymous.com'
    },
    email: {
        type: String,
        default: 'mikey.prus@gmail.com'
    },
    subject: {
        type: String,
    },
    text: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Message = model('Message', MessageSchema);

export default Message;