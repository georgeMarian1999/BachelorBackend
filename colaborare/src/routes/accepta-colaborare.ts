import { BadRequestError } from '@licenta-dev/common';
import express,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import { ColaborareAcceptataPublisher } from '../events/publishers/colaborare-acceptata-publisher';
const router=express.Router();
import axios, { AxiosError, AxiosResponse } from 'axios';
import { natsWrapper } from '../nats-wrapper';

router.put(
  '/colaborare/accepta/:id',
  async (req:Request,res:Response)=>{
    const id=req.params.id;
    const existingCol=Colaborare.findById(id);
    if(!existingCol){
      throw new BadRequestError("Colaborarea pe care doriti sa o acceptati nu exista");
    }
    existingCol.exec(async function(err,colaborare){
      if(err){
        res.status(500).send("Internal error");
      }
      if(colaborare){
        colaborare.status="ACCEPTATA";
        if(colaborare.tema_id!=0){
        axios.put('https://licenta-microservices.herokuapp.com/monolit/tema/confirmare/'+colaborare.tema_id)
          .then(async (response:AxiosResponse)=>{
            await colaborare.save();
            new ColaborareAcceptataPublisher(natsWrapper.client).publish({
              profesor_id:colaborare.profesor_id,
            
            })
            res.send("Colaborare acceptata "+response.data);
          })
          .catch((err:AxiosError)=>{
            res.status(500).send(err.message);
          })
        }
        else {
          await colaborare.save();
          new ColaborareAcceptataPublisher(natsWrapper.client).publish({
            profesor_id:colaborare.profesor_id,
          })
          res.send("Colaborare acceptata cu tema proprie");
        }
    }
      

    })
  }
)





export {router as acceptaColaborareRouter};