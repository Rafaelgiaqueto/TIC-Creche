import { Request, Response } from "express";
import { MaintenanceService } from "../services/maintenanceService";

const maintenanceService = new MaintenanceService();

export class MaintenanceController {
  async createMaintenance(req: Request, res: Response) {
    const { companyId, maintenanceData } = req.body;

    try {
      await maintenanceService.createMaintenance(companyId, maintenanceData);
      return res.status(201).json({ message: "Manutenção criada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getAllMaintenances(req: Request, res: Response) {
    try {
      const maintenances = await maintenanceService.getAllMaintenances();
      return res.json(maintenances);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getMaintenanceById(req: Request, res: Response) {
    const { id_manutencao } = req.params;

    try {
      const maintenance = await maintenanceService.getMaintenanceById(id_manutencao);
      return res.json(maintenance);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async updateMaintenanceById(req: Request, res: Response) {
    const { id_manutencao } = req.params;
    const { maintenanceData } = req.body;

    try {
      await maintenanceService.updateMaintenanceById(id_manutencao, maintenanceData);
      return res.json({ message: "Manutenção atualizada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async deleteMaintenance(req: Request, res: Response) {
    const { id_manutencao } = req.params;

    try {
      await maintenanceService.deleteMaintenance(id_manutencao);
      return res.status(200).json({ message: "Manutenção excluída com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
