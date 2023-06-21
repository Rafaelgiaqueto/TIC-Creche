import { Request, Response } from "express";
import { MaintenanceCompanyService } from "../services/MaintenanceCompanyService";

const maintenanceCompanyService = new MaintenanceCompanyService();

export class MaintenanceCompanyController {
  async createMaintenanceCompany(req: Request, res: Response) {
    const {
      nome_empresa,
      tecnico_responsavel,
      telefone,
      email,
      cnpj,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
    } = req.body;

    try {
      await maintenanceCompanyService.createMaintenanceCompany(
        nome_empresa,
        tecnico_responsavel,
        telefone,
        email,
        cnpj,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais
      );
      return res.status(201).json({ message: "Empresa criada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getAllMaintenanceCompanys(req: Request, res: Response) {
    try {
      const maintenanceCompanys = await maintenanceCompanyService.getAllMaintenanceCompanys();
      return res.json(maintenanceCompanys);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getMaintenanceCompanyById(req: Request, res: Response) {
    const { id_empresa_manutencao } = req.params;

    try {
      const nome_empresa = await maintenanceCompanyService.getMaintenanceCompanyById(
        id_empresa_manutencao
      );
      return res.json({ nome_empresa });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async updateMaintenanceCompanyById(req: Request, res: Response) {
    const { id_empresa_manutencao } = req.params;
    const {
      nome_empresa,
      tecnico_responsavel,
      telefone,
      email,
      cnpj,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
    } = req.body;

    try {
      await maintenanceCompanyService.updateMaintenanceCompanyById(
        id_empresa_manutencao,
        nome_empresa,
        tecnico_responsavel,
        telefone,
        email,
        cnpj,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais
      );
      return res.json({ message: "Empresa atualizada com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async deleteMaintenanceCompany(req: Request, res: Response) {
    const { id_empresa_manutencao } = req.params;

    try {
      await maintenanceCompanyService.deleteMaintenanceCompany(id_empresa_manutencao);
      return res.status(200).json({ message: "Empresa excluída com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}
