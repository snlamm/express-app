import Fastify from 'fastify';
import { getRouter as getExamplesRouter } from './services/exampleRest/router.js';

const fastify = Fastify({
  logger: true,
});
const port = 3002;

fastify.register(getExamplesRouter, { prefix: '/examples' });

fastify.get('/ping', () => 'pong');

const start = async () => {
  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
