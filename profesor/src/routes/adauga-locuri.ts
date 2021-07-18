import express, {Request, Response} from 'express';
import { Profesor } from '../model/profesor';
import { BadRequestError } from '@licenta-dev/common';
import { ProfesorUpdatedPublisher } from '../events/publishers/profesor-updated-publisher';
import { natsWrapper } from '../nats-wrapper';
const router=express.Router();

router.post(
  '/profesor/add/:id',
  async (req:Request,res:Response)=>{
    console.log("Ajunge aici");
    const id=req.params.id;
    const profesor=await Profesor.findById(id);
  
    const {numar}=req.body;
    if(!profesor){
      throw new BadRequestError("Profesorul specificat nu exista");
    }
      const total=Number(numar)+Number(profesor.numar_locuri);
      
      profesor.set({numar_locuri:total});
      await profesor.save();
      new ProfesorUpdatedPublisher(natsWrapper.client).publish({
        profesor_id:profesor.id,
        facultate_id:profesor.facultate_id,
        numar_locuri:total,
      })
      res.status(200).send("Locuri adaugate");
  
  }
)



export {router as addLocuriRouter}