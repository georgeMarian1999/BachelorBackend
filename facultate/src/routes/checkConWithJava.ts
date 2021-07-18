import express, { Request, Response } from 'express';
import { AxiosResponse,AxiosError } from 'axios';
const router=express.Router();
const axios = require('axios');

router.get(
  '/facultate/check',
  async(req:Request,res:Response)=>{
    console.log("Checking connection with java app");
    axios.get("https://blooming-hollows-04868.herokuapp.com/monolit/tema")
    .then(function(resp:AxiosResponse){
      console.log(resp.data);
      res.status(200).send(resp.data);
    })
    .catch(function(err:AxiosError){
      console.log(err);
      res.status(500).send("Could not get response from java"+err);
    })

    
  }
)
export {router as checkRouter};