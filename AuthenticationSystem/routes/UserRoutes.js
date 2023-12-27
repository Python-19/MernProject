import express from 'express';
const router =express.Router();
import { UserRegistration, UserLogin ,UpdateUserPassword, LoggedUser, SendUserPasswordResetEmail, UserPasswordReset} from "../controllers/UserControllers.js";
import checkUserAuth from '../controllers/middleware/auth-middleware.js';
//Middleware -To protect Route
router.use("/changepassword", checkUserAuth);
router.use('/loggeduser',checkUserAuth)
//public Route
router.post("/register", UserRegistration);
router.post("/login", UserLogin)
router.post("/send-reset-password-email",SendUserPasswordResetEmail)
router.post("/send-reset-password/:id/:token",UserPasswordReset)
//Protected Route
router.post("/changepassword", UpdateUserPassword);
router.get('/loggeduser',LoggedUser)
export default router;