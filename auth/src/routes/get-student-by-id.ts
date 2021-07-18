import { BadRequestError } from '@licenta-dev/common';
import express,{Request,Response} from 'express';
import { User } from '../models/user';
const router=express.Router();

router.get(
  '/users/:id',
  async (req:Request,res:Response)=>{
    const student_id=req.params.id;
    const student= await User.findById(student_id);
    if(!student){
      throw new BadRequestError("Student not found by the id provided");
    }
    res.send(student);
  }
)



export {router as getStudentByIdRouter};