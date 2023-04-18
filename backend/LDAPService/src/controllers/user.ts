import ldapjs, { DN, SearchEntryObject, SearchOptions } from "ldapjs";
import { basicLDAPSearch } from "../utils/ldapSearch.js";
import { generatePersonObject } from "../utils/generators.js";

// Query LDAP server for user with UPN
async function getLDAPUser(userPrincipalName: string) {
    
    const searchDN: DN = ldapjs.parseDN('DC=ad,DC=kevharv,DC=com');
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(userPrincipalName=${userPrincipalName})`,
    }
    
    // Perform search within DN tree position with search parameters
    const response: any = await basicLDAPSearch(searchDN, searchParams);

    // Return the friend user object
    // return generatePersonObject(response.attributes);
    return response;
}

export { getLDAPUser };