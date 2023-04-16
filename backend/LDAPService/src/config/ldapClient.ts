import ldap from 'ldapjs';
import logger from './logger.js';

// Set constants from environment
// const ldapServerAddress = "ldap://" + process.env.LDAP_ADDRESS;
// const bindDN = process.env.BIND_DN;
// const bindPW = process.env.BIND_PW;
const ldapServerAddress = "ldap://192.168.1.80"
const bindDN = "CN=Test User,OU=Harvey Users,DC=ad,DC=kevharv,DC=com"
const bindPW = "P@ssword!"

export default function initClient() {
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
            // logger.info(res);
        })
    } catch (err) {
        logger.error(err);
    }

    return ldapClient;
}