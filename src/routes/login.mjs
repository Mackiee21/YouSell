import router from 'express';

const loginRouter = router();

loginRouter.post('/api/login', (req, res) => {
    const {body: {username, password}} = req;
    if(username === "ucb-18534413" && password === "Pandac_21"){
        res.cookie("mypokie", "isyourstoeat", {maxAge: 1000 * 60});

        return res.status(201).json({redirectTo: "/profile", cookieMo: "mypokie"});
    }
    return res.json({msg: "invalid email or password"});
})

export default loginRouter;