import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();

router.post("/login",authController.login)

export const authRouter = router;




// Method	Route	Description
// POST	/register	Register new user
// POST	/login	User login
// POST	/refresh-token	Generate new access token
// POST	/logout	Logout user
// POST	/forgot-password	Send reset password email
// POST	/reset-password	Reset password
// POST	/change-password	Change password
// GET	/me	Get current logged-in user