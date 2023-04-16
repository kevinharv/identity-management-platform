import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import initClient from './config/ldapClient.js';

const port = process.env.NODE_PORT || 3000;
const app = express();
app.use(cors());
const ldapClient = initClient();

// Function to print LDAP user attributes
function printRes(obj: any) {
    for (let i = 0; i < obj.length; i++) {
        const item = obj[i];
        console.log("Type: " + item.type);
        console.log("Values: ");
        for (let j = 0; j < item.values.length; j++) {
            console.log(item.values[j]);
        }
    }
}

// DEBUGGING main route
app.get('/', async (req, res2) => {
    ldapClient.search('DC=ad,DC=kevharv,DC=com', {
        scope: 'sub',
        filter: '(DisplayName=Test User)',
        // attributes: 'dc'
    }, function (err, res) {

        res.on('searchEntry', function (entry: any) {
            console.log('entry: ' + JSON.stringify(entry.pojo));
            printRes(entry.pojo.attributes);
            res2.send(entry.pojo.attributes);
        });
        res.on('searchReference', function (referral) {
            console.log('referral: ' + referral.uris.join());
        });
        res.on('error', function (err) {
            console.error('error: ' + err.message);
        });
        res.on('end', function (result) {
            // console.log('status: ' + result.status);
        });
    });
});

// Handle graceful shutdown
function serverShutdown() {
    logger.info("Starting server shutdown");
    // Unbind (disconnect) LDAP client
    try {
        logger.info("Unbinding LDAP")
        ldapClient.unbind((err) => {
            logger.error(err);
        })
    } catch (err) {
        logger.error(err);
    }
    
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