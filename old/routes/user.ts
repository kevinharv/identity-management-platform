import express, { Response } from "express";
import { getUserByUPN, getUsersByGroupMembership } from "../controllers/userSearch.js";
import { DirectoryPerson } from "../utils/generators.js";

// Create Express router for user routes
const userRouter = express.Router();

// Define the get user route
userRouter.get("/get", async (req: any, res) => {
    // Query for user with query parameters
    const user = (await getUserByUPN(req.query.upn)).searchEntries;
    // Convert to a DirectoryPerson
    const userObj = new DirectoryPerson(user[0]);
    res.send(userObj);
});

// Get all users with some UPN string
userRouter.get("/get/all", async (req: any, res) => {
    // Query for users with specified UPN
    const users = (await getUserByUPN(req.query.upn)).searchEntries;
    // Create array of LDAPPerson(s)
    let persons: LDAPPerson[] = [];
    // Convert each search entry to LDAPPerson
    users.forEach(entry => {
        console.log(entry);
        persons.push(new DirectoryPerson(entry));
    });
    res.send(persons);
});

// Get the raw LDAP response
userRouter.get("/raw", async (req: any, res) => {
    // Query for user with query parameters
    const user = await getUserByUPN(req.query.upn);
    res.send(user);
});

userRouter.get("/member", async(req: any, res: any) => {
    // Query for users with specified UPN
    const users = (await getUsersByGroupMembership(req.query.group)).searchEntries;
    // console.log(req.query.group)
    // Create array of LDAPPerson(s)
    let persons: LDAPPerson[] = [];
    // Convert each search entry to LDAPPerson
    users.forEach(entry => {
        console.log(entry);
        persons.push(new DirectoryPerson(entry));
    });
    res.send(persons);
})

export default userRouter;