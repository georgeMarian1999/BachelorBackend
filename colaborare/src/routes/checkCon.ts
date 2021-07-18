import express, { Request, Response } from 'express';
const router=express.Router();
router.get(
  '/colaborare/check',
  async (req:Request,res:Response)=>{
    console.log("Checking connection for colaborare");
    res.send("Connection up");
  }
)

export {router as checkRouter}