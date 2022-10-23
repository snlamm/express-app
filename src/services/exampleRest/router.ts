import { FastifyInstance } from 'fastify';
import { EXAMPLE_RESULTS } from './constants.js';
import {
  addExampleItem,
  getAllExampleItems,
  showExampleItem,
  updateExampleItem,
} from './persistence.js';

/**
 * Routes for /examples
 */
export const getRouter = async (fastify: FastifyInstance) => {
  fastify.get('/', () => {
    const allItems = getAllExampleItems();

    return {
      results: allItems,
    };
  });

  fastify.get<{
    Params: { index: string };
  }>('/:index', (req) => {
    const index = Number(req.params.index);
    const result = showExampleItem({ index });

    return {
      result,
    };
  });

  fastify.post<{
    Body: { item: number };
  }>('/', (req) => {
    const newItem = req.body.item;
    addExampleItem({ newItem });

    return {
      newItemIndex: EXAMPLE_RESULTS.length - 1,
    };
  });

  fastify.put<{
    Params: { index: string };
    Body: { item: number };
  }>('/:index', (req, reply) => {
    const newItem = req.body.item.toString();
    const index = Number(req.params.index);

    updateExampleItem({
      newItem,
      index,
    });

    reply.status(204);
  });
};
