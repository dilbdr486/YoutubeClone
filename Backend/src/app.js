import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//improt routes
import userRouter from './routes/userRoutes.js';
import healthcheckRouter from './routes/healthcareRoute.js'
import tweetRouter from './routes/tweetRoute.js'
import subscriptionRouter from './routes/subscriptionRoute.js'
import videoRouter from './routes/videoRoute.js'
import commentRouter from './routes/commentRoute.js'
import likeRouter from './routes/likeRoute.js'
import playlistRouter from './routes/playlistRoute.js'
import dashboardRouter from './routes/dashboardRoute.js'


// api routes
app.use('/api/v1/users', userRouter);
app.use("/api/v1/healthcheck", healthcheckRouter)
// app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

export {app};