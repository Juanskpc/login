import { Router } from "express";
import { UsuarioController } from "../controllers/usuariosController.js";
import { verificarAdmin, verificarToken } from "../middlewares/jwt.middleware.js";

const router = Router();

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);
router.get('/perfil', verificarToken, UsuarioController.perfil);

// Admin

router.get('/', verificarToken, verificarAdmin, UsuarioController.obtenerUsuarios)
router.put('/updateRolVet/:idUsuario', verificarToken, verificarAdmin, UsuarioController.updateRoleVet)

export default router;