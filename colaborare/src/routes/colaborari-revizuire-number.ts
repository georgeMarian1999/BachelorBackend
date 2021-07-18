import express,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import { BadRequestError } from '@licenta-dev/common';
const router=express.Router();


router.get(
  '/colaborare/revizuire/profesor/numar/:id',
  async (req:Request,res:Response)=>{
    const profesor_id=req.params.id;
    const col=await Colaborare.find({'profesor_id':profesor_id!,'status':'REVIZUIRE'});
    if(!col){
      throw new BadRequestError("Nu aveti colaborari in revizuire");
    }
    const numar=col.length;
    res.status(200).send({numar});
  }
)
export {router as numarColaborari}