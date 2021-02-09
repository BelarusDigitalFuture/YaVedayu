import { Router } from 'express';
import { getTestData, search } from '../controllers/api';

const router = Router();
router
  .get(`/test`, getTestData)
  .get('/search', search);

export default {
  use: '/api/v1',
  router: router,
};
