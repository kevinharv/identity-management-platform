import Fastify from 'fastify';
import { Client } from 'ldapts';

const LDAP_ADDRESS: string = process.env.LDAP_ADDRESS;
const BIND_DN: string = process.env.BIND_DN;
const BIND_PW: string = process.env.BIND_PW;


const fastify = Fastify({
    logger: true
});

// Start Pino Logging


// DB Operations


// LDAP Connection
// try {
//     const client = new Client({
//         url: `ldaps://${LDAP_ADDRESS}`,
//         timeout: 0,
//         connectTimeout: 0,
//         tlsOptions: {
//             minVersion: 'TLSv1.2',
//         },
//         strictDN: true,
//     });
//     await client.bind(BIND_DN, BIND_PW);
// }
// finally {
//     console.error("LDAPS Connection Failed - trying LDAP");
// }

const client = new Client({
    url: `ldap://${LDAP_ADDRESS}`,
    timeout: 0,
    connectTimeout: 0,
    strictDN: true,
});
await client.bind(BIND_DN, BIND_PW);
// LDAP Bind
const { value } = await client.exop('1.3.6.1.4.1.4203.1.11.3');
console.log(value);






fastify.get('/', async (reqest, response) => {
    return {
        hello: 'world'
    }
})

const start = async () => {
    try {
        await fastify.listen({ host: "0.0.0.0", port: 3000 })
        // await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

fastify.close().then(async () => {
    await client.unbind();
    console.log('successfully closed!')
}, async (err) => {
    await client.unbind();
    console.log('an error happened', err)
})

start();