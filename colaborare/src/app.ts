import express from 'express';
import 'express-async-errors';
import {json } from "body-parser";
import { NotFoundError } from '@licenta-dev/common';
import { errorHandler } from '@licenta-dev/common';
import { checkRouter } from './routes/checkCon';

import cookieSession from 'cookie-session';
import { addRouter } from './routes/add';
import { getColaborariProfesor } from './routes/get-colaborari-profesor';
import { getColaborareStudent } from './routes/get-colaborare-student';
import { acceptaColaborareRouter } from './routes/accepta-colaborare';
import { refuzaColaborareRouter } from './routes/refuza-colaborare';
import { getColaborariRefuzateRouter } from './routes/get-colaborari-refuzate';
import { getColaborareRevizuireRouter } from './routes/get-colaborare-revizuire';
import { checkStudentRouter } from './routes/check-student';
import { colaborariRefuzateProfesor } from './routes/get-colaborari-refuzate-profesor';
import { numarColaborari } from './routes/colaborari-revizuire-number';
import { colaborariRevizuireProfesor } from './routes/get-colaborari-revizuire-profesor';
const app = express(); 


app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);
app.use(checkRouter);
app.use(addRouter);
app.use(getColaborareStudent);
app.use(getColaborariProfesor);
app.use(acceptaColaborareRouter);
app.use(refuzaColaborareRouter);
app.use(getColaborariRefuzateRouter);
app.use(getColaborareRevizuireRouter);
app.use(checkStudentRouter);
app.use(colaborariRefuzateProfesor);
app.use(colaborariRevizuireProfesor);
app.use(numarColaborari);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};