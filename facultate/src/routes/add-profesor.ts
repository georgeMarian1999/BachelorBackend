import express ,{Request,Response} from 'express';
const router = express.Router();
import { Facultate } from '../model/facultate';

router.put('/facultate/addteacher/:facultate_id',
async (req:Request,res:Response)=>{
  const facultate_id= req.params.facultate_id;
  const teacher = req.body;
  const facultate=Facultate.findById(facultate_id);
  facultate.select('teachers');
  facultate.exec(async function(err,facultate){
    if(err){
      res.status(500).send("Could not add teacher");
    }
    if(facultate){
      facultate.teachers.push(teacher);
      await facultate.save();
      res.status(201).send("Added");
    }
  })
  
}

);

export {router as addTeacherRouter};