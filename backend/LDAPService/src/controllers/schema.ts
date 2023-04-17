import ldapjs, { DN, SearchEntryObject, SearchOptions } from "ldapjs";
import { basicLDAPSearch } from "../utils/ldapSearch.js";

async function getADSchema() {

    const searchDN: DN = ldapjs.parseDN('CN=Schema,CN=Configuration,DC=ad,DC=kevharv,DC=com');
    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'base',
        filter: `(objectClass=*)`,
    }

    // Perform search within DN tree position with search parameters
    const response: any = await basicLDAPSearch(searchDN, searchParams);

    // Return the friend user object
    return (response);
}

export { getADSchema };