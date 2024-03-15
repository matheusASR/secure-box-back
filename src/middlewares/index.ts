import { handleError } from "./handleErrors.middlewares";
import { verifyToken } from "./verifyToken.middlewares";
import { verifyIdExists } from "./verifyIdExists.middlewares";
import { verifyEmailExists } from "./verifyEmailExists.middlewares";
import { verifyCpfExists } from "./verifyCpfExists.middlewares";
import { verifyCelExists } from "./verifyCelExists.middlewares";
import { validateBody } from "./validateBody.middlewares";
import { isAccountOwner } from "./isAccountOwner.middlewares";

export default {
  handleError,
  verifyToken,
  verifyIdExists,
  verifyEmailExists,
  verifyCpfExists,
  verifyCelExists,
  validateBody,
  isAccountOwner
};
