import { BadRequestError } from '@licenta-dev/common';
import express,{Request,Response} from 'express';
import { Profesor } from '../model/profesor';
const router=express.Router();


router.get(
  '/profesor/:id',
  async (req:Request,res:Response)=>{
    const id=req.params.id;
    const profesor=await Profesor.findById(id);
    if(!profesor){
      throw new BadRequestError("Profesorul specificat nu exista");
    }
    res.send(profesor);
    
  }
)


export {router as getProfByIdRouter};