import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '@licenta-dev/common';
import { BadRequestError } from '@licenta-dev/common';

import { Profesor } from '../model/profesor';
import { natsWrapper } from '../nats-wrapper';
import { ProfesorCreatedPublisher } from '../events/publishers/profesor-created-publisher';
const router=express.Router();

router.post(
  '/profesor/signup',
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
    const {email,password,firstname,lastname,numar_locuri,titlu,facultate_id}= req.body;

    const existingProf=await Profesor.findOne({email});
    if(existingProf){
      throw new BadRequestError("Email in use");
    }
    const prof= Profesor.build(
      {
        email,
        password,
        firstname,
        lastname,
        numar_locuri,
        titlu,
        facultate_id,
      }
    );
    await prof.save();
    new ProfesorCreatedPublisher(natsWrapper.client).publish({
      id:prof.id,
      email:prof.email,
      firstname:prof.firstname,
      lastname:prof.lastname,
      numar_locuri:numar_locuri,
      titlu:prof.titlu,
      facultate_id:prof.facultate_id,
    })
    const profJwt = jwt.sign(
      {
        id: prof.id,
        email: prof.email,
        firstname: prof.firstname,
        lastname:prof.lastname,
        numar_locuri:prof.numar_locuri,
        titlu: prof.titlu,
        facultate_id:prof.facultate_id,
      },
      process.env.jwt!
    );

  
    req.session = {
      jwt: profJwt
    };

    res.status(201).send(prof);
  }
);

export {router as signUpRouter};