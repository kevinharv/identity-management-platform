import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import ldapClient, { connect } from './config/ldapClient.js';
import userRouter from './routes/user.js';

// Configure application
const port = process.env.NODE_PORT || 3000;
const app = express();
app.use(cors());

// Define routes
app.use("/user", userRouter);
app.get("/healthcheck", (req, res) => {
    if (ldapClient.isConnected) {
        res.sendStatus(200);
    }
});

// Handle graceful shutdown
function serverShutdown() {
    logger.info("Initiating Server Shutdown");

    // Unbind (disconnect) LDAP client
    logger.info("Unbinding LDAP Client");
    ldapClient.unbind();
    
    // Shutdown Express Server
    logger.info("Server Going Down");
    process.exit(0);
}

// Handle terminate/interrupt
process.on("SIGINT", serverShutdown);
process.on("SIGTERM", serverShutdown);

// Bring server online
app.listen(port, async () => {
    if (!(await connect())) {
        serverShutdown();
    }
    logger.info(`Server Listening on Port: ${port}`);
});