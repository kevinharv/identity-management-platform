import express from "express";
import { getLDAPUser } from "../controllers/user.js";

// Create Express router for user routes
const userRouter = express.Router();

// Define the get user route
userRouter.get("/get", async (req: any, res) => {
    // Query for user with query parameters
    const user: LDAPPerson = await getLDAPUser(req.query.upn);
    res.send(user);
});

export default userRouter;