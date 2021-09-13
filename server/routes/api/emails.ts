import express, {Request, Response, Router, NextFunction} from 'express';

import asyncHandler from "../../middlewares/async";
import Message from "../../models/Message";
import User from '../../models/User';
import ErrorResponse from '../../utils/ErrorResponse';


const router: Router = express.Router();


router.post('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { from, subject, text } = req.body;


    const message = await new Message({
        email: 'mikey.prus@gmail.com', from, subject, text
    });

    await message.save();

    res.json({ success: true, message })

}))

router.get('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorResponse('You need to be logged in.', 404))
    }

    const messages = await Message.find({ email });

    await messages.save();

    res.json({ success: true, messages })

}))

export default router;