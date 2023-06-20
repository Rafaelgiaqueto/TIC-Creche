import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const { nome, email, telefone, senha } = req.body;

    try {
      await userService.createUser(nome, email, telefone, senha);

      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }   
     }
  }

  async getUsersById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userService.getUserById(id);

      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;

    try {
      await userService.updateUser(id, nome, email, telefone, senha);

      return res.json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
  
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
  
      await userService.deleteUser(id);
  
      return res.json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
  
}
