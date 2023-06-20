import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export class LoginController {
    async login(req: Request, res: Response) {
        const {email, senha} = req.body
        // Verificando se o email está existe
        const user = await userRepository.findOneBy({ email })
        if(!user) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos' });
        }
    
        // Verificando se a senha é válida para o e-mail cadastrado
        const verifyPass = await bcrypt.compare(senha, user.senha)
        if(!verifyPass){
            return res.status(401).json({ message: 'E-mail ou senha inválidos' });
        }
    
        // Autenticar o usuário
        const token = jwt.sign({ id: user.id}, process.env.JWT_PASS ?? '', { 
            expiresIn: '1d',
        })
    
        const {senha: _, ...userLogin} = user
    
        return res.json({
            user: userLogin,
            token: token,
        })
    }
}
