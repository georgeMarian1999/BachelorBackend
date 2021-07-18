import express,{Request,Response } from 'express';

const router=express.Router();
import {Facultate} from '../model/facultate';


router.put(
  '/facultate/updateprof/:id',
  async (req:Request,res:Response)=>{
    const fac_id=req.params.id;
    const {profesor_id,numar_locuri} =req.body;
    let newTeachers=[];
    const facultate=await Facultate.findById(fac_id);
    if(facultate){
      for(let i=0;i<facultate.teachers.length;i++){
        if(facultate.teachers[i].id===profesor_id){
          console.log("Gasit prof");
          facultate.teachers[i].numar_locuri=numar_locuri;
          
        }
      }
      newTeachers=facultate.teachers;
    }
    const facultate2=await Facultate.findById(fac_id);
    if(facultate2){
      facultate2.set({teachers: newTeachers});
      await facultate2.save();
      res.send(facultate2.teachers);
    }
      
    else res.status(500);
  }
)




export {router as updateProfesorRouter}