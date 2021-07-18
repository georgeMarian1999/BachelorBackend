import { BadRequestError } from '@licenta-dev/common';
import express,{Request,Response} from 'express';

import { Profesor } from '../model/profesor';

const router=express.Router();


router.get(
  '/profesor/locuri/:id',
  async (req:Request,res:Response)=>{
    const prof_id=req.params.id;
    const profesor=await Profesor.findById(prof_id);
    if(!profesor){
      throw new BadRequestError("Nu s-a gasit profesorul cu id-ul precizat");
    }
    res.send(profesor.numar_locuri);
  }
)


export {router as getLocuriRouter}