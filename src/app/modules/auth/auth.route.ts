import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();

router.post("/login",authController.login);
router.post("/logout",authController.logout);
export const authRouter = router;



// POST	/logout	Logout user


// POST	/refresh-token	Generate new access token
// POST	/forgot-password	Send reset password email
// POST	/reset-password	Reset password
// POST	/change-password	Change password
