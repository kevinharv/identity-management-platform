import express from 'express';
import cors from 'cors';
import ldap from 'ldapjs';
import { pino } from 'pino';

// Set constants from environment
// const ldapServerAddress = "ldap://" + process.env.LDAP_ADDRESS;
// const bindDN = process.env.BIND_DN;
// const bindPW = process.env.BIND_PW;
const ldapServerAddress = "ldap://192.168.1.80"
const bindDN = "CN=Test User,OU=Harvey Users,DC=ad,DC=kevharv,DC=com"
const bindPW = "P@ssword!"
const port = process.env.NODE_PORT || 3000;

// Initialize logger
const logger = pino();

// Initialize Express server
const app = express();
app.use(cors());

// Initialize LDAP client
const ldapClient = ldap.createClient({
    url: ldapServerAddress,
    log: logger,
    timeout: 10000,
    connectTimeout: 5000,
    reconnect: true
});

// Attempt LDAP bind
try {
    logger.info(`Attempting bind on ${ldapServerAddress} with ${bindDN}`)
    ldapClient.bind(bindDN, bindPW, (err, res) => {
        logger.info(res);
    })
} catch (err) {
    logger.error(err);
}


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
            console.log('status: ' + result.status);
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
    console.log(`Server Listening on Port: ${port}`);
});