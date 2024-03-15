import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
// import {
  
// } from "./routers";
// import middlewares from "./middlewares";

const app = express();
app.use(json());
// const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
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

// app.use("/users", userRouter);
// app.use("/login", loginRouter);
// app.use("/profile", profileRouter)
app.use(middlewares.handleError);

export default app;