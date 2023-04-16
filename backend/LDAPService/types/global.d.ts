interface LDAPPerson {
    objectClass: string[];
    objectCategory: string;
    cn: string;
    sn: string;
    name: string;
    givenName: string;
    displayName: string;
    sAMAccountName: string;
    userPrincipalName: string;
    distinguishedName: string;
    memberOf: string[];
    countryCode: string;
    whenCreated: Date;
    whenChanged: Date;
    accountExpires: Date;
    pwdLastSet: Date;
    badPwdCount: number;
    badPasswordTime: string;
    lastLogon: Date;
    lastLogoff: Date;
    lastLogonTimestamp: Date;
    logonCount: string;
}

// Add LDAP query result type(s)