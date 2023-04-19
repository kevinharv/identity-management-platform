# LDAP Service
The LDAP Service is responsible for interfacing with the directory server. It provides a wrapper and multiple endpoints for managing users and groups within the directory. As a microservice, it provides a layer of abstraction for the rest of the services to interact with. This greatly simplifies the rest of the business logic by removing the error checking and functional complexities of the LDAP interaction.

## Configuration
There are two sets of environment variables. The first is in the env directory and contains configuration items for the LDAP connection and logging services. The other env file is in the root of the project and contains configuration items for deployment such as port number and hostname. The latter will be set in the deployment configuration of a larger scale Docker Compose/Swarm or Kubernetes style deployment.

### Service Configuraiton
```sh
LDAP_ADDRESS="LDAPS_VIP_DNS_NAME.company.com"
BIND_DN="CN=SvcAcct,OU=Service Accounts,DC=ad,DC=company,DC=com"
BIND_PW="SvcAcct_Password"
LOG_PATH="/mounted-path"
LOG_LEVEL="error"
```
- LDAP_ADDRESS - the IP address or domain name of your LDAP server. This should be behind a load balanced virtual IP (VIP) for optimal performance.
- BIND_DN - the fully qualified distinguished name of the account used to perform operations in the directory. It should have R/W premissions for all objects in scope.
- BIND_PW - the password for the service account. This should be a very very long, secure, random, rotated password.
- LOG_PATH - TBD, probably switching to volume mount
- LOG_LEVEL - the level of logs to be stored (trace, debug, warn, error, fatal)

### Deployment Configuration
```sh
SERVER_PORT=3000
SERVER_HOSTNAME="http://localhost"
```

## Tech Stack
The LDAP Service runs an Express web server that makes queries against an LDAP service with an implementation of the ldapjs library. 

- NodeJS
- ExpressJS
- ldapjs
- pino
- Docker