/*
    Methods
    - Initialize the client - connect to LDAP server
    - Initialize LDAP bind
    - Unbind LDAP
    - CRUD? - maybe in another module
*/

import ldap from 'ldapjs';
import logger from './logger.js';

// Set constants from environment
// const ldapServerAddress = "ldap://" + process.env.LDAP_ADDRESS;
// const bindDN = process.env.BIND_DN;
// const bindPW = process.env.BIND_PW;
const ldapServerAddress = "ldap://192.168.1.80"
const bindDN = "CN=Test User,OU=Harvey Users,DC=ad,DC=kevharv,DC=com"
const bindPW = "P@ssword!"


const ldapClient = ldap.createClient({
    url: ldapServerAddress,
    log: logger,
    timeout: 2000,
    connectTimeout: 5000,
    reconnect: {
        initialDelay: 100,
        maxDelay: 1000,
        failAfter: 10
    }
});

// Error handlers
ldapClient.on('error', (err) => {
    logger.error(`LDAP Client has encountered and error: ${err}`);
});

ldapClient.on('connectRefused', (err) => {
    logger.error(`LDAP Client connection refused: ${err}`);
});
    
ldapClient.on('connect', () => {
    logger.info(`LDAP Client connection successful`);
    logger.info(`Attempting bind on ${ldapServerAddress} with ${bindDN}`)
    ldapClient.bind(bindDN, bindPW, (err, res) => {
        if (err) {
            logger.error(`LDAP Client encountered an error on bind: ${err}`);
        } else {
            logger.info('LDAP Bind Successful');
        }
    });
});


export default ldapClient;