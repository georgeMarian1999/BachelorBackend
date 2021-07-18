import express, {Request,Response} from 'express';
import { NotFoundError } from '@licenta-dev/common';
import { Facultate } from '../model/facultate';
const router=express.Router();

router.get(
  '/facultate/profesori/:id',
  async (req:Request,res:Response)=>{
    const id=req.params.id;
    const facultate=Facultate.findById(id);
    facultate.select('teachers');
    facultate.exec(async function(err,facultate){
    if(err){
      throw new NotFoundError();
    }
    if(facultate){
    
      res.status(200).send(facultate.teachers);
    }
  })
  }
)

export {router as getProfesoriRouter}