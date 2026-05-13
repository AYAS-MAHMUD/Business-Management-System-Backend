import { Router } from "express";
import { userController } from "./user.controller";




const router = Router()

router.post("/register",userController.register)
router.get("/all-users",userController.getAllUser);
// router.put("/")
export const userRouter = router