import router, { response } from "express";

const signupRouter = router();

signupRouter.get('/api/sign-up/verify-username/:username', (req, res) => {
    const { username } = req.params;
    if(username === "markpandac02@gmail.com"){
        return res.json({status: "taken"})
    }
    return res.status(200).json({status: "ok"})
})

export default signupRouter;