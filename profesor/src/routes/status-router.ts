import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/profesor/status",
  async (req: Request,res:Response)=>{
    res.status(200).send("Up and running")
  }
)

export {router as statusRouter};