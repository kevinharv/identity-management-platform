import { DN, SearchOptions, SearchEntry, SearchReference } from "ldapts";
import ldapClient from "../config/ldapClient.js";
import logger from "../config/logger.js";

export async function basicLDAPSearch(searchDN, searchParameters: SearchOptions) {
    const results = await ldapClient.search(searchDN, searchParameters);
    console.log(results);
    // const entry: SearchEntry = results[0];
    return results;
}