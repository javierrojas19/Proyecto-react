import { Router } from "express";
import { body, ExpressValidator } from "express-validator";
import { createAcount, login } from "./handlers";
import { handleputErrors } from "./middleware/validation";

const router = Router();

router.get("/", (req, res) => {
  res.send("hola mundo poto");
});

router.get("/nosotros", (req, res) => {
  res.send("Nosotros");
});

router.get("/blog", (req, res) => {
  res.send("Blog");
});

//autenticacion
router.post(
  "/auth/login",
  body("email").isEmail().withMessage("El email es invalido "),
  body("password").notEmpty().withMessage("El password es obligatorio "),
  login
);

router.post(
  "/auth/register",
  [
    body("handle").notEmpty().withMessage("el handle no puede ir vacio"),
    body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
    body("email").isEmail().withMessage("El email es invalido"),
    body("password").notEmpty().withMessage("El password no debe ir vacio"),
    body("password_confirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas deben ser iguales");
      }
      return true;
    }),
    handleputErrors,
  ],
  createAcount
);

export default router;
