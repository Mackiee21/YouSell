import  express from "express";
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from "path";
import cookieParser from 'cookie-parser';
import loginRouter from "./routes/login.mjs";
import { validateUser }  from './customMiddlewares/authenticatedUser.mjs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist`')));
app.use(loginRouter);

app.use(cookieParser());

//app.use(validateUser); //applicable to other routes only not on loginRoute

app.get('/api', (req, res) => {
    //if passed the middleware meaning the user is already logged in
    console.log('natawag ko?')
    return res.send("meoww");
})
//CAT ALL NOT FOUND ROUTES Redirect to NOT FOUND PAGE
app.use("/api", (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'NotFound.html'));
})

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
})
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})


