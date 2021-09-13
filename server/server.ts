require('dotenv').config({ path: './config/config.env' })

import express, {Request, Response, Application} from 'express';
import connect from './config/db';
import errorHandler from './middlewares/error';

import authRouter from './routes/api/auth'
import usersRouter from './routes/api/users'
import emailsRouter from './routes/api/emails'

import cors from 'cors'

const app: Application = express();


connect();

const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

app.use(express.json(<any>{ extended: false }))


app.get('/', (req: Request, res: Response) => res.send('Server is Running...'))


app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/emails', emailsRouter);


app.use(errorHandler)

/* if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static('client/build'))
    
    // get index directory
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} */

const PORT:number | string = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`));

process.on('unhandledRejection', (err: any, _promise: any) => {
    console.log(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})