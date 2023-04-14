import express from 'express';
import cors from 'cors';
import ldap from 'ldapjs';

const app = express();
const port = process.env.NODE_PORT || 3000;
const ldapClient = ldap.createClient({
    url: ['ldap://192.168.1.80']
});

ldapClient.on('connectError', (err) => {
    console.log(err);
})
ldapClient.on('connect', () => {
    console.log("Connected");
})

ldapClient.bind('CN=Test User,OU=Harvey Users,DC=ad,DC=kevharv,DC=com', 'P@ssword!', (err) => {
    console.log(err);
});


const opts = {
    filter: '(DisplayName=Test User)',
    scope: 'sub',
    // attributes: ['cn']
};

app.use(cors());




app.get('/', async (req, res2) => {
    let results = [];
    ldapClient.search('DC=ad,DC=kevharv,DC=com', {
        scope: 'sub',
        filter: '(DisplayName=Test User)',
        // attributes: 'dc'
    }, function (err, res) {

        res.on('searchEntry', function (entry) {
            console.log('entry: ' + JSON.stringify(entry.object));
            res2.send(entry.object);
        });
        res.on('searchReference', function (referral) {
            console.log('referral: ' + referral.uris.join());
        });
        res.on('error', function (err) {
            console.error('error: ' + err.message);
        });
        res.on('end', function (result) {
            console.log('status: ' + result.status);
        });
    });
});


function serverShutdown() {
    console.info("Server Going Down");
    // Unbind (disconnect) LDAP client
    ldapClient.unbind((err) => {
        console.log(err);
    })
    // Shutdown Express Server
    process.exit(0);
}

// Handle terminate/interrupt
process.on("SIGINT", serverShutdown);
process.on("SIGTERM", serverShutdown);

app.listen(port, () => {
    console.log(`Server Listening on Port: ${port}`);
});