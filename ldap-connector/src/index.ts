import Fastify from 'fastify';
const fastify = Fastify({
    logger: true
});

fastify.get('/', async (reqest, response) => {
    return {
        hello: 'world'
    }
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();