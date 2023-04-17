# IDM Monorepo
Modern IDM solution for large enterprises. Automate user provisioning, deprovisioning, group membership, and more!

# Architecture
Microservices (ish) architecture.

## Frontend
- Administrative/Service Portal
    - Allows configuration of IDM
    - Allows Service Desk personnel level of access
- User Self-Service Portal
    - Allows users to perform common tasks on their account
    - Can be configured to allow updates to password, email, etc.

## Backend
- API Gateway
- LDAP Connector
- Administration Management
    - Manage IDM
    - Manage Groups
- User Management
    - Heaviest use endpoint (directory updates, most queries)
    - Separation allows dynamic scaling
- Cron Job Handler
- Data Import Handler

## DB
- PostgreSQL
    - Store all users and attributes
    - Some attributes may not get flushed to AD, but handled by IDM for management
- Redis
    - Cache common transactions
    - Provide caching layer for DB writes during heavy operation
    - Combine with LDAP queue feature


## Deployment
- Docker containers
- Docker compose and set of environment variables
- Templates for rapid deployment and integration


# Packages, Libraries, and Tools
- ldapjs for LDAP interaction
- passportjs for authentication
- Prisma for DB interactions


# Features
- Create jobs to automatically import datasets
- Automate changes to AD/LDAP directories
- Create versatile and extensible rules for user organization
- Webhooks for changes within IDM
- Management portal for administrators
- Self-Service portal for end-users

## Technical Features
- Parse CSVs, TXTs, JSON data for use in IDM
- Export datasets for other cron job type tasks
- User portal for updating information, passwords
- Admin portal for configuring IDM
- Mass migration/change/update - logical editor
- Lockouts and blocking during large operations
- Seamless code upgrades? Minimal downtime?

## Configuration Options
- Target Directory
- Reconnect settings?
- edu optional plugin - K12 and higher ed extended attributes
