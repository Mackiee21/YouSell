import router from "express"
import { User } from "../Schemas/UserSchema.mjs"
import bcrypt from 'bcrypt'

const signupRouter = router();

signupRouter.get("/api/sign-up/verify-username/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const usernameTaken = await User.findOne({ username });
        if(usernameTaken){
            return res.json({status: "taken"})
        }else{
            return res.json({status: "no"})
    }
    } catch (error) {
        return res.status(500).json({message: "Problem occurs. Try again!"})
    }
})
signupRouter.post('/api/sign-up', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({...req.body, password: hashedPassword});
    try {
        const savedUser = await newUser.save();
        req.login(savedUser, (err) => {
            if(err){
                return res.send(500).json({message: "Internal server error, Please try again"})
            }
            return res.status(201).cookie("user", savedUser.username).json({ redirectTo: "/", user: {username: savedUser.username, name: savedUser.name} });
        })
    } catch (error) {
        return res.status(500).json({message: "Error saving to DB"})
    }
})

export default signupRouter;