import { Router } from "express";
import { UsuarioController } from "../controllers/usuariosController.js";
import { verificarToken } from "../middlewares/jwt.middleware.js";

const router = Router();

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);
router.get('/perfil', verificarToken, UsuarioController.perfil);

export default router;