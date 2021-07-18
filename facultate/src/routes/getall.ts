import { BadRequestError } from '@licenta-dev/common';
import express, { Request, Response } from 'express';

import { Facultate } from '../model/facultate';
const router = express.Router();


router.get("/facultate",
async (req:Request,res:Response)=>{
  const allFacultate= Facultate.find({},function(err,result){
    if(err){
      console.log(err);
      throw new BadRequestError(err.message);
    }
    else {
      res.status(200).json(result);
    }
  })
}

)
export {router as getAllRouter};