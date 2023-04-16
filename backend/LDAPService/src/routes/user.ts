// CRUD for user records
import { SearchOptions } from "ldapjs";
import ldapClient from "../config/ldapClient.js";
import logger from "../config/logger.js";

function generatePersonObject(LDAPAttributes): LDAPPerson {
    // Generate ISO standard date strings and objects
    const createDateString = LDAPAttributes[6].values[0].substring(0, 4) + '-' + LDAPAttributes[6].values[0].substring(4, 6) + '-' + LDAPAttributes[6].values[0].substring(6, 8) + 'T' + LDAPAttributes[6].values[0].substring(8, 10) + ':' + LDAPAttributes[6].values[0].substring(10, 12) + ':' + LDAPAttributes[6].values[0].substring(12, 14) + 'Z';
    const changeDateString = LDAPAttributes[7].values[0].substring(0, 4) + '-' + LDAPAttributes[7].values[0].substring(4, 6) + '-' + LDAPAttributes[7].values[0].substring(6, 8) + 'T' + LDAPAttributes[7].values[0].substring(8, 10) + ':' + LDAPAttributes[7].values[0].substring(10, 12) + ':' + LDAPAttributes[7].values[0].substring(12, 14) + 'Z';
    const createDate = new Date(createDateString);
    const changeDate = new Date(changeDateString);

    // Create a LDAPPerson object out of the LDAP query return
    const LDAPUser: LDAPPerson = {
        objectClass: LDAPAttributes[0].values,
        objectCategory: LDAPAttributes[30].values[0],
        cn: LDAPAttributes[1].values[0],
        sn: LDAPAttributes[2].values[0],
        name: LDAPAttributes[12].values[0],
        givenName: LDAPAttributes[3].values[0],
        displayName: LDAPAttributes[8].values[0],
        sAMAccountName: LDAPAttributes[27].values[0],
        userPrincipalName: LDAPAttributes[29].values[0],
        distinguishedName: LDAPAttributes[4].values[0],
        memberOf: LDAPAttributes[10].values,
        countryCode: LDAPAttributes[17].values[0],
        whenCreated: createDate,
        whenChanged: changeDate,
        accountExpires: new Date(LDAPAttributes[25].values[0] / 1e4 - 1.16444736e13),
        pwdLastSet: new Date(LDAPAttributes[21].values[0] / 1e4 - 1.16444736e13),
        badPwdCount: LDAPAttributes[15].values[0] as number,
        badPasswordTime: LDAPAttributes[18].values[0],
        lastLogon: new Date(LDAPAttributes[20].values[0] / 1e4 - 1.16444736e13),
        lastLogoff: new Date(LDAPAttributes[19].values[0] / 1e4 - 1.16444736e13),
        lastLogonTimestamp: new Date(LDAPAttributes[32].values[0] / 1e4 - 1.16444736e13),
        logonCount: LDAPAttributes[26].values[0]
    }
    return LDAPUser;
}

// Query LDAP server for user
async function getLDAPUser(userPrincipalName: string) {
    let userAttrs;

    // Search by userPrincipalName
    const searchParams: SearchOptions = {
        scope: 'sub',
        filter: `(userPrincipalName=${userPrincipalName})`,
    }

    // Wrap search in promise and set timeout
    const searchRes = new Promise((resolve, reject) => {
        ldapClient.search('DC=ad,DC=kevharv,DC=com', searchParams, (err, res) => {
        if (err) {
            reject(err);
        }

        // Reject promise if search time exceeds 2 seconds
        setTimeout(() => {
            reject('LDAP Search Timeout');
        }, 2000);

        // On search entry, get the attributes and generate the object
        res.on('searchEntry', function (entry: any) {
            userAttrs = entry.pojo.attributes;
            resolve(generatePersonObject(userAttrs));
        });
        res.on('searchReference', function (referral) {
            // console.log('referral: ' + referral.uris.join());
        });
        res.on('error', function (err) {
            // console.error('error: ' + err.message);
        });
        res.on('end', function (result) {
            // console.log('status: ' + result.status);
        });
    })

});

    // TODO - clean this up
    let ret;
    try {
        ret = await searchRes;
    }
    catch (err) {
        logger.error(err);
    }
    return ret;
}

export { getLDAPUser }