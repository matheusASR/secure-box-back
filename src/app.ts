import "reflect-metadata";
import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import { cageRouter, loginRouter, userRouter } from "./routers";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());
const allowedOrigins = [""];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new Error("Acesso não permitido por política de mesma origem (CORS).")
      );
    }
  },
};

app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/cages", cageRouter)
// app.use("/allocations", allocationRouter);
app.use(middlewares.handleError);

export default app;