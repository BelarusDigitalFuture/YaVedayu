import { Router } from 'express';
import { getTestData, search, getStats } from '../controllers/api';

const router = Router();
router
  .get(`/test`, getTestData)
  .get('/search', search)
  .get('/stats', getStats);

export default {
  use: '/api/v1',
  router: router,
};
