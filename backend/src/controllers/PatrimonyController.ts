import { Request, Response } from "express";
import { PatrimonyService } from "../services/patrimonyService";


const patrimonyService = new PatrimonyService();

export class PatrimonyController {
  async createPatrimony(req: Request, res: Response) {
    const {
      nome_patrimonio,
      descricao,
      historico_manutencao,
      nr_serie,
      id_categoria,
      id_local_patrimonio,
    } = req.body;

    // Verificar se o usuário autenticado existe e obter o ID do usuário
    const userId = req.user?.id;

    try {
      if (!userId) {
        throw new Error("Usuário não autenticado");
      }

      const createdPatrimony = await patrimonyService.createPatrimony(userId, {
        nome_patrimonio,
        descricao,
        historico_manutencao,
        nr_serie,
        id_categoria,
        id_local_patrimonio,
      });

      return res.status(201).json({
        message: "Patrimônio criado com sucesso!",
        patrimonio: createdPatrimony,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  


  async getPatrimonys(req: Request, res: Response) {
    try {
      const patrimonys = await patrimonyService.getAllPatrimonys();
      return res.json(patrimonys)
    } catch(error) {
      if(error instanceof Error) {
        return res.status(400).json({error: error.message})
      }
    }
  }

  async getPatrimonysById(req: Request, res: Response) {
    const {id_patrimonio} = req.params

    try {
      const patrimony = await patrimonyService.getPatrimonysById(id_patrimonio);
      return res.json(patrimony)
    } catch (error) {
      if(error instanceof Error) {
        return res.status(400).json({message: error.message})
      }
    }
  }


  async updatePatrimony(req: Request, res: Response) {
    const {id_patrimonio} = req.params;
    const {nome_patrimonio, descricao, historico_manutencao, nr_serie, id_categoria, id_local_patrimonio} = req.body

    try {
      await patrimonyService.updatePatrimony(id_patrimonio, {
        nome_patrimonio,
        descricao,
        historico_manutencao,
        nr_serie,
        id_categoria,
        id_local_patrimonio
      });
      

      return res.json({message: "Patrimônio atualizado com sucesso!"})
    } catch(error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  } 

  async deletePatrimony(req: Request, res: Response) {
    const {id_patrimonio} = req.params;

    try {
      await patrimonyService.deletePatrimony(id_patrimonio);
      return res.status(200).json("Patrimônio deletado com sucesso!")
    } catch (error) { 
      if(error instanceof Error) {
        return res.status(400).json({error: error.message})
      }
    }
  }
}