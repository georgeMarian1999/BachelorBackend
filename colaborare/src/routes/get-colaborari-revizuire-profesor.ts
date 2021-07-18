import express,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import { BadRequestError } from '@licenta-dev/common';
const router=express.Router();


router.get(
  '/colaborare/revizuire/profesor/:id',
  async (req:Request,res:Response)=>{
    const profesor_id=req.params.id;
    const col=await Colaborare.find({'profesor_id':profesor_id!,'status':'REVIZUIRE'});
    if(!col){
      throw new BadRequestError("Nu aveti colaborari in revizuire");
    }
    console.log(col);
    
    if(col.length==0){
      throw new BadRequestError("Nu aveti colaborari in revizuire");
    }
    res.send(col);
  }
)
export {router as colaborariRevizuireProfesor}