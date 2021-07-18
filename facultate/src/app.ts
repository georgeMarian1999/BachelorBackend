import express from "express";
import {json } from "body-parser";
import { NotFoundError } from '@licenta-dev/common';
import { errorHandler } from '@licenta-dev/common';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { addFacultateRouter } from "./routes/add-facultate";
import { getAllRouter } from "./routes/getall";
import { addTeacherRouter } from "./routes/add-profesor";
import { checkRouter } from "./routes/checkConWithJava";
import { getProfesoriRouter } from "./routes/get-profesori";
import { updateProfesorRouter } from "./routes/update-profesor";
const app = express(); 
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);
app.use(addFacultateRouter);
app.use(addTeacherRouter);
app.use(checkRouter);
app.use(getAllRouter);
app.use(updateProfesorRouter);
app.use(getProfesoriRouter);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};