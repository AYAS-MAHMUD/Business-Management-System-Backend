import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validationRequest";
import { createUserValidation, updateUserValidation } from "./user.validation";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "./user.interface";




const router = Router()
 
router.post("/register",validateRequest(createUserValidation),userController.register)
router.get("/all-users",authCheck(Role.ADMIN,Role.MANAGER),userController.getAllUser);
router.get("/getMe",authCheck(...Object.values(Role)),userController.getMe)



router.patch("/:id",validateRequest(updateUserValidation),authCheck(...Object.values(Role)),userController.updateUser)
router.get("/:id",authCheck(Role.ADMIN,Role.MANAGER,Role.EMPLOYEE),userController.getSingleUser)
router.delete("/:id",authCheck(Role.ADMIN),userController.softDeleteUser);



export const userRouter = router



// DELETE	/:id	Soft delete user

// PATCH	/:id/status	Update user status
