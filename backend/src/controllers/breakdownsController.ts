import { Request, Response } from "express";
import { BreakdownsService } from "../services/breakdownsService";

const breakdownsService = new BreakdownsService();

export class BreakdownsController {
  async createBreakdown(req: Request, res: Response) {
    const {
      descricao,
      data_avaria,
      id_manutencao,
      id_patrimonio
    } = req.body;

    try {
      await breakdownsService.createBreakdown({
        descricao,
        data_avaria,
        id_manutencao,
        id_patrimonio
      });

      return res.json({ message: "Avaria criada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async getAllBreakdowns(req: Request, res: Response) {
    try {
      const breakdowns = await breakdownsService.getAllBreakdowns();
      return res.json(breakdowns);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async getBreakdownById(req: Request, res: Response) {
    const { id_avaria } = req.params;

    try {
      const breakdown = await breakdownsService.getBreakdownById(id_avaria);
      return res.json(breakdown);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async updateBreakdown(req: Request, res: Response) {
    const { id_avaria } = req.params;
    const { descricao, data_avaria, id_patrimonio, id_manutencao } = req.body;

    try {
      await breakdownsService.updateBreakdown(id_avaria, {
        descricao,
        data_avaria,
        id_patrimonio,
        id_manutencao
      });

      return res.json({ message: "Avaria atualizada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async deleteBreakdown(req: Request, res: Response) {
    const { id_avaria } = req.params;

    try {
      await breakdownsService.deleteBreakdown(id_avaria);
      return res.status(200).json("Avaria deletada com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
