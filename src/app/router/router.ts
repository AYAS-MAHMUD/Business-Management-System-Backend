import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { userRouter } from "../modules/users/user.route";

const router = Router();

const routes = [
    {
        path : "/auth",
        route : authRouter,
    },
    {
        path : "/user",
        route : userRouter,
    },
]
// router.use("dkd",rou)
routes.forEach((element) => router.use(element.path , element.route));

export default router;