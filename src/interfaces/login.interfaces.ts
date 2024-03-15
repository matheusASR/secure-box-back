import { z } from "zod";
import { userLoginSchema } from "../schemas";

type Login = z.infer<typeof userLoginSchema>;
type LoginReturn = {
  token: string;
};

export {
    Login,
    LoginReturn
}