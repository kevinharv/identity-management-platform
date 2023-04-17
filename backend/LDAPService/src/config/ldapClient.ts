import ldap from 'ldapjs';
import logger from './logger.js';

// Set constants from environment
const ldapServerAddress = process.env.LDAP_ADDRESS || "192.168.1.80";
const bindDN = process.env.BIND_DN || "CN=Test User,OU=Harvey Users,DC=ad,DC=kevharv,DC=com";
const bindPW = process.env.BIND_PW || "P@ssword!";

// Create the LDAP client - connect with optimal settings
const ldapClient = ldap.createClient({
    url: "ldap://" + ldapServerAddress,
    log: logger,
    timeout: 2000,
    connectTimeout: 5000,
    reconnect: {
        initialDelay: 100,
        maxDelay: 1000,
        failAfter: 10
    }
});

// Error Handlers
ldapClient.on('error', (err) => {
    logger.error(`LDAP Client has encountered and error: ${err}`);
});

ldapClient.on('connectRefused', (err) => {
    logger.error(`LDAP Client connection refused: ${err}`);
});
    
// Handle successful connection
ldapClient.on('connect', () => {
    logger.info(`LDAP Client connection successful`);
    logger.info(`Attempting bind on ${ldapServerAddress} with ${bindDN}`)
    
    // Bind to LDAP server with bind credentials
    ldapClient.bind(bindDN, bindPW, (err, res) => {
        if (err) {
            logger.error(`LDAP Client encountered an error on bind: ${err}`);
        } else {
            logger.info('LDAP Bind Successful');
        }
    });
});


export default ldapClient;