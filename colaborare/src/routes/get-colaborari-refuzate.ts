import express,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import { BadRequestError } from '@licenta-dev/common';
const router=express.Router();


router.get(
  '/colaborare/refuzate/:id',
  async (req:Request,res:Response)=>{
    const student_id=req.params.id;
    const col=await Colaborare.find({'student_id':student_id!,'status':'REFUZATA'});
    if(!col){
      throw new BadRequestError("Nu aveti colaborari refuzate");
    }
    console.log(col);
    
    if(col.length==0){
      throw new BadRequestError("Nu aveti colaborari refuzate");
    }
    res.send(col);
  }
)



export {router as getColaborariRefuzateRouter};