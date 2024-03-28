import "reflect-metadata";
import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import {
  allocationRouter,
  cageRouter,
  loginRouter,
  paymentMethodRouter,
  paymentRouter,
  profileRouter,
  userRouter,
} from "./routers";
import middlewares from "./middlewares";
import { walletRouter } from "./routers/wallet.routers";

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
app.use("/cages", cageRouter);
app.use("/profile", profileRouter);
app.use("/allocations", allocationRouter);
app.use("/payments", paymentRouter);
app.use("/wallets", walletRouter);
app.use("/paymentMethods", paymentMethodRouter);
app.use(middlewares.handleError);

export default app;
