import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validationRequest";
import { createUserValidation, updateUserValidation } from "./user.validation";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "./user.interface";




const router = Router()

router.post("/register",validateRequest(createUserValidation),userController.register)
router.get("/all-users",authCheck(...Object.values([Role.ADMIN,Role.MANAGER])),userController.getAllUser);
router.patch("/:id",validateRequest(updateUserValidation),authCheck(...Object.values(Role)),userController.updateUser)
router.get("/:id",authCheck(...Object.values([Role.ADMIN,Role.MANAGER,Role.EMPLOYEE])),userController.getSingleUser)
router.get("/getMe",userController.getMe)



export const userRouter = router


// GET	/profile/me	My profile


// DELETE	/:id	Soft delete user
// PATCH	/:id/status	Update user status
// PATCH	/:id/role	Change role