import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


<<<<<<< HEAD
//import routes
import router from "../src/routes/user.routes.js"

//routes declared heer
app.use("/api/v1/users", router)

=======
>>>>>>> 20a0284a706d50b1d9290b4bebb9caa6261c2d87
export {app}