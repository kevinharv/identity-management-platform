import express from "express";
import { getLDAPUser } from "../controllers/user.js";
import { getADSchema } from "../controllers/schema.js";
import { generatePersonObject } from "../utils/generators.js";

// Create Express router for user routes
const userRouter = express.Router();

// Define the get user route
userRouter.get("/get", async (req: any, res) => {
    // Query for user with query parameters
    const user = await getLDAPUser(req.query.upn);
    res.send(generatePersonObject(user.attributes));
});


userRouter.get("/raw", async (req: any, res) => {
    // Query for user with query parameters
    const user = await getLDAPUser(req.query.upn);
    res.send(user.attributes);
});

export default userRouter;