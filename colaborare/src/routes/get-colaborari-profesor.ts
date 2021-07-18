import { BadRequestError, NotFoundError,currentUser } from '@licenta-dev/common';
import express ,{Request,Response} from 'express';
import { Colaborare } from '../model/colaborare';
const router = express.Router();


router.get(
  '/colaborare/profesor/:id',
  async (req:Request,res:Response)=>{
    const profesor_id=req.params.id;
    const colaborari=Colaborare.find({profesor_id,'status':'ACCEPTATA'});
    colaborari.exec((err,colaborari)=>{
      if(colaborari){
        if(colaborari.length==0){
          res.status(400).send("Nu aveti colaborari");
          //throw new BadRequestError("Nu s-au gasit colaborari pentru profesorul precizat");
        }
        else res.status(200).json(colaborari);
      }
    })
  }
)


export {router as getColaborariProfesor};