import express,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import { BadRequestError } from '@licenta-dev/common';
const router=express.Router();

router.get(
  '/colaborare/check/:id',
  async (req:Request,res:Response)=> {
    let status="REVIZUIRE";
    const student_id=req.params.id;
    const revizuireCol=await Colaborare.findOne({student_id,status});
    status="ACCEPTATA";
    const acceptedCol=await Colaborare.findOne({student_id,status});
    
    if(revizuireCol){
      throw new BadRequestError("Colaborare activa si in revizuire");
    }
    if(acceptedCol){
      throw new BadRequestError("Colaborare activa si acceptata de catre profesor");
    }
    res.send("Puteti face cerere de colaborare");
  }
)



export {router as checkStudentRouter}