import  express from "express";
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from "path";
import session from "express-session";
import loginRouter from "./routes/login.mjs";
import signupRouter from "./routes/signup.mjs";
import passport from "passport";
import './strategies/localStrategy.js';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

mongoose.connect("mongodb+srv://mackiee21:hmWDj54mM657g7wa@cluster0.imwqxua.mongodb.net/yousell?retryWrites=true&w=majority").then(() => {
    console.log("connected to database")
}).catch((err) => {
    console.log("Error", err)
    process.exit(1)
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
        maxAge: 2629568000 //1 MONTH DAW NI ahahahahhahha ana gpt
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))

app.use(passport.initialize());
app.use(passport.session());




app.get("/", (req, res) => {
    if(!req.user || !req.cookies.user){
        return res.clearCookie("user").status(401).redirect("/login")
    }
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    
})
//IF USER TRIES TO ACCESS  THESE ROUTES and THEY'RE LOGGED IN, REDIRECT
//COULD DO THIS CLIENT SIDE THOUGH HAHAHAHAH PERO BATIG EFFECT MAN HAHAHAAHAH
app.get("/login", (req, res) => {
    if(req.user){
        return res.status(401).redirect("/")
    }
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.get("/sign-up", (req, res) => {
    if(req.user){
        return res.status(401).redirect("/")
    }
    return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})


//IF YOU WANT TO USE THE SERVER TO SERVER TO DO SOME ACTION BASED ON SOME ROUTES, DEFINE
//IT BEFORE YOU USE EXPRESS.STATIC MIDDLEWARE SO THAT REACT-ROUTER-DOM WOULD NOT INTERFERE

app.use(express.static(path.join(__dirname, '../client/dist')))

app.use(loginRouter);
app.use(signupRouter)


//LOGOUT USER
app.get("/api/logout", (req, res) => {
    res.clearCookie("user")
    req.logout((err) => {
        if(err){
            console.log("Error here: ", err)
            return res.status(500).json({message: "Buang mani oi"})
        }
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({message: "Internal Server Error ()"});
            }
        })
        res.json({status: "ok"})
    });
    
})
//ACTUAL API's HERE FROM AXIOS NA JD HAHHAHAHH
app.get("/api/user", (req, res) => {
    if(req.user){
        return res.status(200).json({user: req.user});
    }
    return res.clearCookie("user").status(401).json({message: "Session Expired. You have been logged out!"})
})

//app.use(validateUser); //applicable to other routes only not on loginRoute
app.get('/api/auth/status',(req, res, next) => {
    console.log("hello matawag ko?")
    const { session: { passport } } = req;
    if(!passport?.user || !req.cookies.user){
        console.log("tama na bakla")
         res.clearCookie("user").status(401).json({message: "Session Expired. Log in again"})
    }else{
        next();
    }
    
}, (req, res) => {
    //if passed the middleware meaning the user is already logged in
    if(!req.user){
        return res.json({status: "Unauthorized"});
    }
    return res.json({user: req.user});
})


// //CAT ALL NOT FOUND ROUTES Redirect to NOT FOUND PAGE
// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'NotFound.html'));
// })
app.get("*", (_, res) => {
    console.log("hello?")
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})


