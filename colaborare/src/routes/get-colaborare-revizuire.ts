import express,{Request,Response} from 'express';
import { BadRequestError } from '@licenta-dev/common';
import { Colaborare } from '../model/colaborare';
import axios,{AxiosResponse,AxiosError} from 'axios';
const router=express.Router();

router.get(
  '/colaborare/revizuire/:id',
  async (req:Request,res:Response)=>{
    const student_id=req.params.id;
    const status="REVIZUIRE";
    const existingCol=await Colaborare.findOne({student_id,status});
    if(!existingCol){
      throw new BadRequestError("Nu exista colaborari in revizuire pentru studentul precizat");
    }
    if(existingCol?.tema_proprie===""){
      await axios.get('https://licenta-microservices.herokuapp.com/monolit/tema/'+existingCol?.tema_id)
        .then((response:AxiosResponse)=>{
          res.send({
            colaborare:existingCol,
            tema:response.data
          });
        
        }).catch((err:AxiosError)=>{
          res.send({
            colaborare:existingCol,
            eroare:err.message
          });
        });
      }
      else res.send(existingCol);
  }
)






export {router as getColaborareRevizuireRouter};