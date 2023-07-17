import { DN, SearchOptions } from "ldapts";
import { basicLDAPSearch } from "../utils/ldapSearch.js";
import { GlobalSearchDN } from "../config/ldapClient.js";

/*
    Search Items
    - Created/Changed < or > specified date
    - accountExpires before/after date
*/

// Query LDAP server for user with UPN
export async function getUserByUPN(userPrincipalName: string) {
    
    const searchDN =  GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(userPrincipalName=${userPrincipalName})`,
    }
    
    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return single object (because UPN is unique)
    return response;
}

// Query for user with sAMAccountName
export async function getUserBysAMAccountName(sAMAccountName: string) {

    const searchDN = GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(sAMAccountName=${sAMAccountName})`,
    }

    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return single object (because sAMAccountName is unique)
    return response;
}

// Query for user with common name (cn)
export async function getUsersByCommonName(cn: string) {

    const searchDN = GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(cn=${cn})`,
    }

    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return array of users
    return response;
}

// Query for user with name
export async function getUsersByName(name: string) {

    const searchDN = GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(name=${name})`,
    }

    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return array of users
    return response;
}

// Query for user with surname
export async function getUsersBySurname(sn: string) {

    const searchDN = GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(sn=${sn})`,
    }

    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return array of users
    return response;
}

// Query for user with display name
export async function getUsersByDisplayName(displayName: string) {

    const searchDN = GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(displayName=${displayName})`,
    }

    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return array of users
    return response;
}

// Query for user with distringuished name
export async function getUserByDN(dn: string) {

    const searchDN = GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(distinguishedName=${dn})`,
    }

    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return single object (because distinguishedName is unique)
    return response;
}

// Query for user that is member of a group
export async function getUsersByGroupMembership(groupDN: string) {

    const searchDN = GlobalSearchDN;
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(memberOf=${groupDN})`,
    }

    // Perform search within DN tree position with search parameters
    const response = await basicLDAPSearch(searchDN, searchParams);

    // Return array of users
    return response;
}