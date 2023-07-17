// Define DirectoryPerson class/object - basically the same as an LDAP SearchEntry from ldapts
class DirectoryPerson {
    objectClass?: string[];
    objectCategory?: string;
    cn?: string;
    sn?: string;
    name?: string;
    givenName?: string;
    displayName?: string;
    sAMAccountName?: string;
    userPrincipalName?: string;
    distinguishedName?: string;
    memberOf?: string[];
    countryCode?: string;
    whenCreated?: Date;
    whenChanged?: Date;
    accountExpires?: Date;
    pwdLastSet?: Date;
    badPwdCount?: number;
    badPasswordTime?: Date;
    lastLogon?: Date;
    lastLogoff?: Date;
    lastLogonTimestamp?: Date;
    logonCount?: string;

    constructor(LDAPAttributes) {
        // Programatically set keys from search entry
        for (const key in LDAPAttributes) {
            if (this.hasOwnProperty(key)) {
                this[key] = LDAPAttributes[key];
            }
        }

        // Unit conversions of Dates/Times
        if (this.whenCreated) {
            const tmp = this.whenCreated.toString();
            this.whenCreated = new Date(tmp.substring(0, 4) + '-' + tmp.substring(4, 6) + '-' + tmp.substring(6, 8) + 'T' + tmp.substring(8, 10) + ':' + tmp.substring(10, 12) + ':' + tmp.substring(12, 14) + 'Z');
        }
        if (this.whenChanged) {
            const tmp = this.whenChanged.toString();
            this.whenChanged = new Date(tmp.substring(0, 4) + '-' + tmp.substring(4, 6) + '-' + tmp.substring(6, 8) + 'T' + tmp.substring(8, 10) + ':' + tmp.substring(10, 12) + ':' + tmp.substring(12, 14) + 'Z');
        }
        if (this.accountExpires) {
            const str: unknown = this.accountExpires.toString() as unknown;
            const tmp: number = str as number;
            this.accountExpires = new Date(tmp / 1e4 - 1.16444736e13);
        }
        if (this.pwdLastSet) {
            const str: unknown = this.pwdLastSet.toString() as unknown;
            const tmp: number = str as number;
            this.pwdLastSet = new Date(tmp / 1e4 - 1.16444736e13);
        }
        if (this.badPasswordTime) {
            const str: unknown = this.badPasswordTime.toString() as unknown;
            const tmp: number = str as number;
            this.badPasswordTime = new Date(tmp / 1e4 - 1.16444736e13);
        }
        if (this.lastLogon) {
            const str: unknown = this.lastLogon.toString() as unknown;
            const tmp: number = str as number;
            this.lastLogon = new Date(tmp / 1e4 - 1.16444736e13);
        }
        if (this.lastLogoff) {
            const str: unknown = this.lastLogoff.toString() as unknown;
            const tmp: number = str as number;
            this.lastLogoff = new Date(tmp / 1e4 - 1.16444736e13);
        }
        if (this.lastLogonTimestamp) {
            const str: unknown = this.lastLogonTimestamp.toString() as unknown;
            const tmp: number = str as number;
            this.lastLogonTimestamp = new Date(tmp / 1e4 - 1.16444736e13);
        }
    }
}


export { DirectoryPerson };