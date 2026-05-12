import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";

const router = Router();

const routes = [
    {
        path : "/auth",
        route : authRouter,
    },
    // {
    //     path : "/user",
    //     route : authRouter,
    // },
]
// router.use("dkd",rou)
routes.forEach((element) => router.use(element.path , element.route));

export default router;