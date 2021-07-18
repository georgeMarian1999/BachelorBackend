import express,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import { BadRequestError } from '@licenta-dev/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
const router=express.Router();

router.post(
  '/colaborare/add',
  async (req:Request,res:Response)=>{
    
    const {student_id,profesor_id,tema_id,tema_proprie,descriere}=req.body;
    let status="REVIZUIRE";
    const revizuireCol=await Colaborare.findOne({student_id,status});
    status="ACCEPTATA";
    const acceptedCol=await Colaborare.findOne({student_id,status});
    if(tema_id==0&&tema_proprie===""){
      throw new BadRequestError("Trebuie sa alegeti cel putin o tema");
    }
    if(revizuireCol){
      console.log(revizuireCol);
      throw new BadRequestError("Exista deja o colaborare in revizuire pentru studentul precizat");
    }
    if(acceptedCol){
      console.log(acceptedCol);
      throw new BadRequestError("Exista deja o colaborare acceptata pentru studentul precizat");
    }
    status="REVIZUIRE";
    const colaborare=Colaborare.build({
      student_id,
      profesor_id,
      tema_id,
      tema_proprie,
      descriere,
      status
    });
    if(tema_id!=0){
      axios.put(
        'https://licenta-microservices.herokuapp.com/monolit/tema/alegere/'+tema_id,
      ).then(async (response:AxiosResponse)=>{
        await colaborare.save();
        res.status(201).send(colaborare);
      })
      .catch((err:AxiosError)=>{
        res.status(500).send(err.message);
      })
    }
    else {
      await colaborare.save();
      res.status(201).send(colaborare);
    }
  }
);
export {router as addRouter};