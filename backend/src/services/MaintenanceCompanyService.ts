import { MaintenanceCompanyRepository } from "../repositories/MaintenanceCompanyRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-erros";

export class MaintenanceCompanyService {
  async createMaintenanceCompany(
    nome_empresa: string,
    tecnico_responsavel: string,
    telefone: string,
    email: string,
    cnpj: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string
  ) {
    const MaintenanceCompanyExists = await MaintenanceCompanyRepository.findOne(
      { where: { nome_empresa: nome_empresa } }
    );
    if (MaintenanceCompanyExists) {
      throw new BadRequestError("Empresa já está cadastrada");
    }

    const newMaintenanceCompany = MaintenanceCompanyRepository.create({
      nome_empresa: nome_empresa,
      tecnico_responsavel: tecnico_responsavel,
      telefone: telefone,
      email: email,
      cnpj: cnpj,
      rua: rua,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      pais: pais,
    });
    await MaintenanceCompanyRepository.save(newMaintenanceCompany);
  }

  async getAllMaintenanceCompanys() {
    return await MaintenanceCompanyRepository.find();
  }

  async getMaintenanceCompanyById(id_empresa_manutencao: string) {
    const MaintenanceCompany = await MaintenanceCompanyRepository.findOne({
      where: { id_empresa_manutencao },
    });

    if (!MaintenanceCompany) {
      throw new NotFoundError("Empresa não encontrada");
    }
    return MaintenanceCompany.nome_empresa;
  }

  async updateMaintenanceCompanyById(
    id_empresa_manutencao: string,
    nome_empresa: string,
    tecnico_responsavel: string,
    telefone: string,
    email: string,
    cnpj: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string
  ) {
    const MaintenanceCompany = await MaintenanceCompanyRepository.findOne({
      where: { id_empresa_manutencao },
    });

    if (!MaintenanceCompany) {
      throw new NotFoundError("Empresa não encontrada");
    }

    MaintenanceCompany.nome_empresa = nome_empresa;
    MaintenanceCompany.tecnico_responsavel = tecnico_responsavel;
    MaintenanceCompany.telefone = telefone;
    MaintenanceCompany.email = email;
    MaintenanceCompany.cnpj = cnpj;
    MaintenanceCompany.rua = rua;
    MaintenanceCompany.numero = numero;
    MaintenanceCompany.complemento = complemento;
    MaintenanceCompany.bairro = bairro;
    MaintenanceCompany.cidade = cidade;
    MaintenanceCompany.estado = estado;
    MaintenanceCompany.pais = pais;

    await MaintenanceCompanyRepository.save(MaintenanceCompany);
  }

  async deleteMaintenanceCompany(id_empresa_manutencao: string) {
    const MaintenanceCompany = await MaintenanceCompanyRepository.findOne({
      where: { id_empresa_manutencao },
    });

    if (!MaintenanceCompany) {
      throw new NotFoundError("Empresa não encontrada");
    }

    await MaintenanceCompanyRepository.remove(MaintenanceCompany);
  }
}
