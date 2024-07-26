import { Router } from "express";
import path from "path";

const router = Router();

const ___dirname = import.meta.dirname;
const publicPath = path.join(___dirname, '../public');

router.get('/login', (req, res) => {
    res.sendFile(publicPath + "/login.html");
})

router.get('/perfil', (req, res) => {
    res.sendFile(publicPath + "/perfil.html");
})

export default router;