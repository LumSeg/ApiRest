import { Router } from "express";
import router from ".";
import { getUsersControllers, idUserControllers, createUserControllers, loginUserControllers } from "../controllers/usersControllers";
import userValidate from "../middlewares/userValidateMidd";
import credentialsValidate from "../middlewares/credentialsValidateMidd";

const userRouter: Router = Router();

userRouter.post("/register", userValidate, createUserControllers);
userRouter.get("/", getUsersControllers);
userRouter.get("/:id", idUserControllers);
userRouter.post("/login", credentialsValidate, loginUserControllers);

export default userRouter;