import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import ldapClient from './config/ldapClient.js';
import userRouter from './routes/user.js';

// Configure application
const port = process.env.NODE_PORT || 3000;
const app = express();
app.use(cors());

// Define routes
app.use("/user", userRouter);
app.get("/healthcheck", (req, res) => {
    if (ldapClient.connected) {
        res.sendStatus(200);
    }
});

// Handle graceful shutdown
function serverShutdown() {
    logger.info("Starting server shutdown");

    // Unbind (disconnect) LDAP client
    logger.info("Unbinding LDAP")
    ldapClient.unbind((err) => {
        // logger.error(err);
    })
    
    // Shutdown Express Server
    process.exit(0);
}

// Handle terminate/interrupt
process.on("SIGINT", serverShutdown);
process.on("SIGTERM", serverShutdown);

// Bring server online
app.listen(port, () => {
    logger.info(`Server Listening on Port: ${port}`);
});