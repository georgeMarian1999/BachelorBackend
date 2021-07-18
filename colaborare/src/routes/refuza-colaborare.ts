import { BadRequestError } from '@licenta-dev/common';
import express, {Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import axios, { AxiosError, AxiosResponse } from 'axios';
const router=express.Router();

router.put(
  '/colaborare/refuza/:id',
  async (req:Request,res:Response)=>{
    const id=req.params.id;

    const existingCol=Colaborare.findById(id);
    if(!existingCol){
      throw new BadRequestError("Nu exista colaborarea pe care doriti sa o refuzati");
    }
    existingCol.exec(async function(err,colaborare){
      if(err){
        res.status(500).send("Internal server error");
      }
      if(colaborare){
        colaborare.status="REFUZATA";
        if(colaborare.tema_id!=0){
        axios.put('https://licenta-microservices.herokuapp.com/monolit/tema/eliberare/'+colaborare.tema_id)
          .then(async (response:AxiosResponse)=>{
            await colaborare.save();
            res.send("Colaborare refuzata "+response.data);
          })
          .catch((err:AxiosError)=>{
            res.status(500).send(err.message);
          });
        }
        else {
          await colaborare.save();
          res.send("Colaborare refuzata cu tema proprie");
        }
    }
    })
  }
)








export {router as refuzaColaborareRouter};