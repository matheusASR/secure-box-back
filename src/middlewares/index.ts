import { handleError } from "./handleErrors.middlewares";
import { verifyToken } from "./verifyToken.middlewares";
import { verifyIdExists } from "./verifyIdExists.middlewares";
import { verifyEmailExists } from "./verifyEmailExists.middlewares";
import { verifyCpfExists } from "./verifyCpfExists.middlewares";
import { verifyCelExists } from "./verifyCelExists.middlewares";
import { validateBody } from "./validateBody.middlewares";
import { isAccountOwner } from "./isAccountOwner.middlewares";
import { isAdmin } from "./isAdmin.middlewares";
import { verifyAllocationIdExists } from "./verifyAllocationIdExists";
import { verifyCageIdExists } from "./verifyCageIdExists";
import { validateCpf } from "./validateCpf.middleware";
import { verifyPaymentMethodExists } from "./verifyPaymentMethodExists";
import { verifyEmail } from "./verifyEmail.middlewares";

export default {
  handleError,
  verifyToken,
  verifyIdExists,
  verifyEmailExists,
  verifyCpfExists,
  verifyCelExists,
  validateBody,
  isAccountOwner,
  isAdmin,
  verifyAllocationIdExists,
  verifyCageIdExists,
  validateCpf,
  verifyPaymentMethodExists,
  verifyEmail
};
