import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '@licenta-dev/common';
import { User } from '../models/user';
import { BadRequestError } from '@licenta-dev/common';

const router = express.Router();

router.post(
  '/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
  
    const { email, password ,firstname,lastname,anStudiu,grupa,sectie,facultate_id} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password ,firstname,lastname,anStudiu,grupa,sectie,facultate_id});
    await user.save();

  
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname:user.lastname,
        anStudiu:user.anStudiu,
        grupa:user.grupa,
        sectie:user.sectie,
      },
      process.env.jwt!
    );

  
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
