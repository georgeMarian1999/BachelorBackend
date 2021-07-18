import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';


import { User } from '../models/user';
import { validateRequest } from '@licenta-dev/common';
import { BadRequestError } from '@licenta-dev/common';
const router = express.Router();

//db user = george dbpass= NocbVDCoEPfgNoGv

router.post(
  '/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    const bcrypt = require('bcrypt');
    const passwordsMatch = bcrypt.compareSync(password, existingUser.password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

   
    const userJwt = jwt.sign(
      {
        id:existingUser.id,
        email:existingUser.email,
        firstname:existingUser.firstname,
        lastname:existingUser.lastname,
        anStudiu:existingUser.anStudiu,
        grupa:existingUser.grupa,
        sectie:existingUser.sectie,
      },
      process.env.jwt!
    );

    
    req.session = {
      jwt: userJwt
    };
    
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
