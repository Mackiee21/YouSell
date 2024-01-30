import  express from "express";
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from "path";
import session from "express-session";
import loginRouter from "./routes/login.mjs";
import { validateUser }  from './customMiddlewares/authenticatedUser.mjs';
import signupRouter from "./routes/signup.mjs";
import passport from "passport";
import './strategies/localStrategy.js';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const ConnectDB = async () => {
   try {
    await mongoose.connect("mongodb+srv://mackiee21:hmWDj54mM657g7wa@cluster0.imwqxua.mongodb.net/yousell?retryWrites=true&w=majority");
    console.log("connected to database")
   } catch (error) {
    console.log("Error Mackiee", error);
    process.exit(1)
   }

}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

mongoose.connect("mongodb+srv://mackiee21:hmWDj54mM657g7wa@cluster0.imwqxua.mongodb.net/yousell?retryWrites=true&w=majority").then(() => {
    console.log("connected to database")
}).catch((err) => {
    console.log("Error", err)
})

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret: "my-secret-is-not-yours",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 2, //two minutes
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    if(!req.user || req.cookies && !req.cookies.user){

        return res.clearCookie("user").status(401).redirect("/login")
    }
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    
})
app.use(express.static(path.join(__dirname, '../client/dist')))

app.use(loginRouter);
app.use(signupRouter)

//app.use(validateUser); //applicable to other routes only not on loginRoute
app.get('/api/auth/status', (req, res) => {
    //if passed the middleware meaning the user is already logged in
    if(!req.user){
        return res.json({status: "Unauthorized"});
    }
    return res.json({user: req.user});
})

//if session expired
app.use((req, res, next) => {
    console.log("hello matawag ko?")
    const { session: { passport } } = req;
    if(!passport?.user){
        return res.clearCookie("user")
    }
    else{
        next();
    }
})

app.get("*", (_, res) => {
    console.log("hello?")
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
})

// //CAT ALL NOT FOUND ROUTES Redirect to NOT FOUND PAGE
// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'NotFound.html'));
// })
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})


