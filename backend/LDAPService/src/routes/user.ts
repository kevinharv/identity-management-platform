import express from "express";
import { getLDAPUser } from "../controllers/user.js";
import { DirectoryPerson } from "../utils/generators.js";

// Create Express router for user routes
const userRouter = express.Router();

// Define the get user route
userRouter.get("/get", async (req: any, res) => {
    // Query for user with query parameters
    const user = await getLDAPUser(req.query.upn);
    const userObj = new DirectoryPerson(user[0].attributes);
    res.send(userObj);
});

userRouter.get("/get/all", async (req: any, res) => {
    const users = await getLDAPUser(req.query.upn);
    let persons: LDAPPerson[] = [];
    users.forEach(entry => {
        persons.push(new DirectoryPerson(entry.attributes));
    });
    res.send(persons);
});


userRouter.get("/raw", async (req: any, res) => {
    // Query for user with query parameters
    const user = await getLDAPUser(req.query.upn);
    res.send(user);
});

export default userRouter;