import { Client } from 'ldapts';
import logger from './logger.js';
import { rejects } from 'assert';

// Set constants from environment
const ldapServerAddress = process.env.LDAP_ADDRESS;
const bindDN = process.env.BIND_DN;
const bindPW = process.env.BIND_PW;

// Create the LDAP client - 5 second timeouts
const ldapClient: Client = new Client({
    url: "ldap://" + ldapServerAddress,
    timeout: 5000,
    connectTimeout: 5000
});

// Export function to bind on DN
export async function connect(): Promise<boolean> {
    try {
        await ldapClient.bind(bindDN, bindPW);
        logger.info(`LDAP Client bind successful`);
        return true;
    } catch (e: any) {
        logger.error(`LDAP Client failed to bind on ${bindDN}`);
        return false;
    }
}

export default ldapClient;