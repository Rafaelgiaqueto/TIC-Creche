import { BadRequestError, NotFoundError } from "../helpers/api-erros";
import { breakdownsRepository } from "../repositories/breakdownsRepository";
import { categoryRepository } from "../repositories/categoryRepository";
import { localPatrimonyRepository } from "../repositories/localPatrimonyRepository";
import { MaintenanceRepository } from "../repositories/maintenanceRepository";
import { patrimonyRepository } from "../repositories/patrimonyRepository";

export class BreakdownsService {
  async updateBreakdown(id_avaria: string, arg1: { descricao: any; data_avaria: any; id_patrimonio: any; id_manutencao: any; }) {
    const { descricao, data_avaria, id_patrimonio, id_manutencao } = arg1;

    const breakdown = await breakdownsRepository.findOne({ where: { id_avaria } });
    if (!breakdown) {
      throw new NotFoundError('Avaria não encontrada');
    }

    const patrimony = await patrimonyRepository.findOne({ where: { id_patrimonio } });
    if (!patrimony) {
      throw new BadRequestError('Patrimônio não encontrado');
    }

    const maintenance = await MaintenanceRepository.findOne({ where: { id_manutencao } });
    if (!maintenance) {
      throw new BadRequestError('Manutenção não encontrada');
    }

    breakdown.descricao = descricao;
    breakdown.data_avaria = data_avaria;
    breakdown.patrimony = patrimony;
    breakdown.maintenance = maintenance;

    await breakdownsRepository.save(breakdown);
  }

  async createBreakdown(breakdownData: any) {
    const patrimony = await patrimonyRepository.findOne({
      where: { id_patrimonio: breakdownData.id_patrimonio }
    });
    if (!patrimony) {
      throw new BadRequestError('Patrimônio não encontrado');
    }

    const maintenance = await MaintenanceRepository.findOne({
      where: { id_manutencao: breakdownData.id_manutencao }
    });
    if (!maintenance) {
      throw new BadRequestError('Manutenção não encontrada');
    }

    const newBreakdown = breakdownsRepository.create({
      ...breakdownData,
      patrimony: patrimony,
      maintenance: maintenance
    });
    await breakdownsRepository.save(newBreakdown);
  }

  async getAllBreakdowns() {
    const breakdowns = await breakdownsRepository.createQueryBuilder("avaria")
      .leftJoinAndSelect('avaria.patrimony', 'patrimony')
      .leftJoinAndSelect('avaria.maintenance', 'maintenance')
      .select([
        'avaria.id_avaria',
        'avaria.descricao',
        'avaria.data_avaria',
        'patrimony.nome_patrimonio',
        'maintenance.descricao_servico'
      ])
      .getMany();

    return breakdowns;
  }

  async getBreakdownById(id_avaria: string) {
    const breakdown = await breakdownsRepository.findOne({ where: { id_avaria } });
    if (!breakdown) {
      throw new NotFoundError('Avaria não encontrada');
    }
    return breakdown;
  }

  async updatePatrimony(id_patrimonio: string, patrimonyData: any) {
    const category = await categoryRepository.findOne({ where: { id_categoria: patrimonyData.id_categoria } });
    if (!category) {
      throw new BadRequestError("Categoria não encontrada");
    }

    const local = await localPatrimonyRepository.findOne({ where: { id_local_patrimonio: patrimonyData.id_local_patrimonio } });
    if (!local) {
      throw new BadRequestError("Local de patrimônio não encontrado");
    }

    const updatedPatrimony = {
      ...patrimonyData,
      category,
      localPatrimony: local,
    };

    await patrimonyRepository.update(id_patrimonio, updatedPatrimony);
  }

  async deleteBreakdown(id_avaria: string) {
    const breakdown = await breakdownsRepository.findOne({ where: { id_avaria } });

    if (!breakdown) {
      throw new NotFoundError("Avaria não encontrada");
    }

    await breakdownsRepository.remove(breakdown);
  }
}
