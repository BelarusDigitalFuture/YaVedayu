import { Router } from 'express';
import { getTestData } from '../controllers/api';

const router = Router();
router
  .get(`/test`, getTestData);

export default {
  use: '/api/v1',
  router: router,
};
