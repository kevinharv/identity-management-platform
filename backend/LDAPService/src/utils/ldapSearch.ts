import { DN, SearchOptions } from "ldapjs";
import ldapClient from "../config/ldapClient.js";
import logger from "../config/logger.js";

// Abstract basic search functionality 
async function basicLDAPSearch(searchDN: DN, searchParameters: SearchOptions) {
    let results = [];
    // Wrap LDAP search in promise
    const LDAPSearchResults = new Promise((resolve, reject) => {
        // Perform search against LDAP server
        ldapClient.search(searchDN.toString(), searchParameters, (err, res) => {
            // Log errors and fail out of promise
            if (err) {
                logger.error(`LDAP search encountered an error: ${err}`);
                reject(null);
            }

            // Reject promise if search time exceeds 2 seconds
            setTimeout(() => {
                logger.debug(`LDAP Search Timeout seeking: ${searchParameters.filter}`);
                reject(null);
            }, 2000);

            // On search entry, get the attributes and generate the object
            res.on('searchEntry', function (entry: any) {
                logger.debug(`LDAP Search found record for ${searchParameters.filter}`);
                results.push(entry.pojo);
            });

            // Other handlers
            res.on('searchReference', function (referral) {
                logger.info('referral: ' + referral.uris.join());
            });
            res.on('error', function (err) {
                logger.debug('error: ' + err.message);
            });
            res.on('end', function (result) {
                resolve(results);
                logger.debug('status: ' + result.status);
            });
        })
    });


    try {
        const res = await LDAPSearchResults;
        return res;
    } catch (err) {
        return null;
    }
    
}

export { basicLDAPSearch };