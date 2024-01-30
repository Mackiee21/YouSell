import router, { response } from 'express';
import passport from 'passport';
import { User } from '../Schemas/UserSchema.mjs'

const loginRouter = router();

loginRouter.post('/api/login', passport.authenticate("local"), async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        return res.status(200).cookie("user", savedUser.username).json({redirectTo: "/", user: savedUser});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
})

export default loginRouter;