import express,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
import { BadRequestError, currentUser } from '@licenta-dev/common';
import axios, { AxiosResponse } from 'axios';
const router=express.Router();
router.get(
  '/colaborare/student/:id',
  currentUser,
  async (req:Request,res:Response)=>{
    const student_id=req.params.id;
    const col=await Colaborare.findOne({'student_id':student_id!,'status':'ACCEPTATA'}).lean().exec();
    console.log(col);
    if(!col){
      throw new BadRequestError("Nu aveti colaborare");
    }
    if(col?.tema_proprie===""){
      await axios.get('https://licenta-microservices.herokuapp.com/monolit/tema/'+col?.tema_id)
        .then((response:AxiosResponse)=>{
          res.send({
            colaborare:col,
            tema:response.data
          });
        
        }).catch((err:Error)=>{
          res.send({
            colaborare:col,
            eroare:"Eroare la serviciul de teme"
          });
        });
      }
      else res.send(col);
    }
  
);
export {router as getColaborareStudent};