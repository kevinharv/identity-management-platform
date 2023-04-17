// Convert the LDAP object into a local user object
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

export { generatePersonObject };