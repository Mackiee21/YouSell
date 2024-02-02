import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../Schemas/UserSchema.mjs'
import bcrypt from 'bcrypt'

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (_id, done) => { //PURPOSE ANI NIYA IS E CHECK NIYANG 
    //DATA NA STORED SA SESSION (ID) THEN FETCH SA DATABASE THEN E STORE NIYANG WHOLE DATA SA USER
    // SA REQ.USER NA PROPERTY
    try {
        const user = await User.findOne({_id});
        if(!user){
            done(new Error("Invalid Credentials"), null)
        }
        done(null, user)
    } catch (error) {
        console.log('error', error)
         done(error, null)
    }
})

export default passport.use(new Strategy(async (username, password, done) => {
    try {
       const user = await User.findOne({ username });
       if(!user) throw new Error("Incorrect email or password")
       if(!await bcrypt.compare(password, user.password)){
        throw new Error("Incorrect email or password")
        //OR DO LIKE THIS done(null, false, {message: "Invalid Password"})
       }
       done(null, user)
    } catch (error) {
        done(error.message, null) 
    }
}))
