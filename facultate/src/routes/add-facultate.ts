import express, { Request, Response } from 'express';

import { Facultate } from '../model/facultate';
const router = express.Router();

router.post(
  '/facultate/add',
  async (req:Request,res:Response)=>{
    const {name}=req.body;
    const teachers=new Array();
    console.log(teachers);
    const facultate = new Facultate({
      name: name,
      teachers: teachers,
    })
    await facultate.save();
    

    res.status(201).send(facultate);
  }

);
export {router as addFacultateRouter};