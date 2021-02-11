import { Router } from 'express';
import { getStats, getStreet, getTestData, search } from '../controllers/api';

const router = Router();
router
  .get(`/test`, getTestData)
  .get('/search', search)
  .get('/street/:id', getStreet)
  .get('/stats', getStats);

export default {
  use: '/api/v1',
  router: router,
};
