import router from "express";

const signupRouter = router();

signupRouter.post('/api/sign-up', (req, res) => {
    const { body } = req;
    console.log(body)
    return res.status(200).json({status: "ok"})
})

export default signupRouter;