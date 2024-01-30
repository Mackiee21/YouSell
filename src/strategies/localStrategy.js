import passport from 'passport';
import { Strategy } from 'passport-local'

passport.serializeUser((user, done) => {
    console.log(`FROM SERIALIZER ${user.username}`)
    done(null, user.username);
})

passport.deserializeUser((username, done) => {
    console.log(`FROM DESERIALIZER ${username}`)
    try {
        if(username === "mackiee"){
            done(null, {username: "mackiee", password: "Pandac_21"})
        }else{
            throw new Error("Invalid credentials")
        }
    } catch (error) {
        console.log('error', error)
         done(error, null)
    }
})

export default passport.use(new Strategy((username, password, done) => {
    try {
        if(username === "mackiee" && password === "Pandac_21"){
            const user = {username, name: "Mark"}
            console.log('from middleware', user)
            done(null, user)
        }else{
            throw new Error("Invalid credentials")
        }
    } catch (error) {
        done(error, null)
    }
}))
