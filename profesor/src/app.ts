import express from "express";
import {json } from "body-parser";
import 'express-async-errors';
import { NotFoundError } from '@licenta-dev/common';
import { errorHandler } from '@licenta-dev/common';
import cookieSession from 'cookie-session';
import { statusRouter } from "./routes/status-router";
import { signUpRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-profesor";
import { getLocuriRouter } from "./routes/get-numar-locuri";
import { addLocuriRouter } from "./routes/adauga-locuri";
import { getProfByIdRouter } from "./routes/get-prof-by-id";
const app = express(); 
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(statusRouter);
app.use(signUpRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(getLocuriRouter);
app.use(getProfByIdRouter);
app.use(addLocuriRouter);



app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export {app};