import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

//routes import
import complaintRouter from './routes/complaintRoute.js';
import './cronJobs/unvarifiedcomplaintCleanup.js';



const app = express()

// middlewares
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }))
app.use(cors())

app.use(express.json({limit:"10000mb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
// app.use(csvParser())
// app.use('public/uploads', express.static('uploads'));

// app.use(fileUpload());
// app.use(upload());

// app.use(cors({
//     origin: 'http://your-frontend-url.com' // replace with your frontend URL
//   }));

// //routes declaration
app.use("/api/v1/submitComlaint", complaintRouter)
// app.use("/api/v1/users", userRouter)
// app.use("/api/v1/websetting", websettingRouter)
// app.use("/api/v1/faq", faqRouter)
// app.use("/api/v1/pages", pagesRoute)
// app.use("/api/v1/contact", contactFormRoute)
// app.use("/api/v1/daycare", dayCareRoute)
// app.use("/api/v1/logs", logsRoute)
// app.use('/api/v1/user-activity', userActivityRoute);
// app.use('/api/v1/stats', statsRoute);
// app.use('/api/v1/landing-page', landingPageRoute);

// app.use("*", async (_, res)=>{
//   return res.status(400).json({message: "API Route Not Found..."})
// })

export { app }
