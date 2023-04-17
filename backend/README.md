# Backend Services
## LDAP Connector
The LDAP connector microservice serves as an abstraction and communication layer for LDAP interactions with the server. This service can be scaled based on demand, but this should only be done if the LDAP server address is a loadbalanced VIP with adequate capacity for additional requests. This service is specifically designed to interact with Microsoft Active Directory services, but the LDAP abstractions should allow it to interact with an industry standard directory service.

### Features
- LDAP User CRUD
- Group Membership Management
- Schema Discovery?


### Tech Stack
- ExpressJS - API web server
- ldapjs - LDAP library for making requests against an LDAP server
- Pino - logging service

### Configuration
#### Log Services
- Specify log path in env file
- Specify log level in env file
    - 'fatal': Fatal Errors
    - 'error': Errors
    - 'warn': Warnings
    - 'info': Info
    - 'debug': Debug
    - 'trace': Trace

## Authentication
