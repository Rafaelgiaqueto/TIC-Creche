import { Request, Response } from "express";
import { LocalPatrimonyService } from "../services/localpatrimonyService";
import { localPatrimonyRepository } from "../repositories/localPatrimonyRepository";
import { NotFoundError } from "../helpers/api-erros";

const localPatrimonyService = new LocalPatrimonyService();

export class LocalPatrimonyController {
  async createLocalPatrimony(req: Request, res: Response) {
    const { nome_local, descricao } = req.body;

    try {
      await localPatrimonyService.createLocalPatrimony(nome_local, descricao);
      return res.status(201).json({ message: "Local do patrimônio criado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getAllLocalPatrimony(req: Request, res: Response) {
    try {
      const localPatrimonies = await localPatrimonyService.getAllLocalPatrimony();
      return res.json(localPatrimonies);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getLocalPatrimonyById(req: Request, res: Response) {
    const { id_local_patrimonio } = req.params;

    try {
      const localPatrimony = await localPatrimonyService.getLocalPatrimonyById(id_local_patrimonio);
      return res.json(localPatrimony);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  async getLocalPatrimonyByName(req: Request, res: Response) {
    const { nome_local } = req.params;

    try {
      const localPatrimony = await localPatrimonyService.getLocalPatrimonyByName(nome_local);
      return res.json(localPatrimony);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Patrimônio não encontrado." });
      } else if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  async updateLocalPatrimony(req: Request, res: Response) {
    const { id_local_patrimonio } = req.params;
    const { nome_local, descricao } = req.body;

    try {
      await localPatrimonyService.updateLocalPatrimony(id_local_patrimonio, nome_local, descricao);
      return res.json({ message: "Local do patrimônio atualizado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async deleteLocalPatrimony(req: Request, res: Response) {
    const { id_local_patrimonio } = req.params;

    try {
      await localPatrimonyService.deleteLocalPatrimony(id_local_patrimonio);
      return res.status(200).json({ message: "Local do patrimônio excluído com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
