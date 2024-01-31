import router from 'express';
import passport from 'passport';

const loginRouter = router();

loginRouter.post('/api/login', (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        //IF done was called with done(error, null)
        //THEN YOU NEED TO USE HERE BELOW THE err.message
        if (err) {
            console.log("Error", err);
            return res.status(400).json({ error: err });
        }
        // Authentication successful, call req.login() to establish a login session
        req.login(user, (err) => {
            if (err) {
                console.log("Error", err);
                return res.status(500).json({ error: "Internal server error, Try again!" });
            }
            // Once login session is established, set the user cookie and respond to the client
            return res.status(200).cookie("user", user.username).json({ redirectTo: "/", user: user });
        });
    })(req, res, next); // Invoke passport.authenticate() as middleware
});


export default loginRouter;