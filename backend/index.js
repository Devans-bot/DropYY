import express from "express"
import dotenv from "dotenv"
import connectDb from "./Src/database.js"
import userroutes from "./Src/routes/routes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from "path";


const PORT=process.env.PORT  || 5002

dotenv.config()
const app = express()

app.use(cors({
    origin:true,
    credentials:true
}))

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.use('/api/user',userroutes)
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "../frontend/dist")));
 app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}

app.listen(PORT,async()=>{
    console.log(`✅Server running on ${PORT}`)
    await connectDb()
})