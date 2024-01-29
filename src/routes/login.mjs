import router from 'express';

const loginRouter = router();

loginRouter.post('/api/login', (req, res) => {
    const {body: {username, password}} = req;
    if(username === "pandacmark21@gmail.com" && password === "Pandac_21"){
        res.cookie("mypokie", "isyourstoeat", {maxAge: 1000 * 60});

        return res.status(201).json({redirectTo: "/", cookieMo: "mypokie"});
    }
    return res.json({msg: "Email or password is incorrect"});
})

export default loginRouter;