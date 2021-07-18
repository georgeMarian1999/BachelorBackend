import express from 'express';
import { currentUser } from '@licenta-dev/common';

const router = express.Router();

router.get('/profesor/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
