import express from "express";
import {json } from "body-parser";
import { NotFoundError } from '@licenta-dev/common';
import { errorHandler } from '@licenta-dev/common';
import 'express-async-errors';

import cookieSession from 'cookie-session';

import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { getStudentByIdRouter } from "./routes/get-student-by-id";
const app = express(); 
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);



app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(getStudentByIdRouter);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};