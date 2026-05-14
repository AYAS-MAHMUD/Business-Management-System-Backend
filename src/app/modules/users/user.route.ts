import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validationRequest";
import { createUserValidation, updateUserValidation } from "./user.validation";




const router = Router()

router.post("/register",validateRequest(createUserValidation),userController.register)
router.get("/all-users",userController.getAllUser);
router.patch("/:id",validateRequest(updateUserValidation),userController.updateUser)
export const userRouter = router