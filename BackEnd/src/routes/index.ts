import { Router } from "express";
import userRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/appointments", appointmentsRouter);

export default router;