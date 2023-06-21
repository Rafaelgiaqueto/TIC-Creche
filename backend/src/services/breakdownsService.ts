import { BadRequestError, NotFoundError } from "../helpers/api-erros";
import { breakdownsRepository } from "../repositories/breakdownsRepository";
import { MaintenanceRepository } from "../repositories/maintenanceRepository";
import { patrimonyRepository } from "../repositories/patrimonyRepository";

export class BreakdownsService {
  async createBreakdown(breakdownData: any){
    // const breakdownExists = await breakdownsRepository.findOne({
    //     where: {id_avaria: breakdownData.id_avaria}
    // })
    // if(breakdownExists){
    //     throw new BadRequestError('Avaria já cadastrada')
    // }

    const patrimony = await patrimonyRepository.findOne({
        where: {id_patrimonio: breakdownData.id_patrimonio}
    })
    if(!patrimony){
        throw new BadRequestError('Patrimônio não encontrado')
    }

    const maintenance = await MaintenanceRepository.findOne({
        where: {id_manutencao: breakdownData.id_manutencao}
    })
    if(!maintenance) {
        throw new BadRequestError('Manutenção não encontrada')
    }

    const newBreakdown = breakdownsRepository.create({
        ...breakdownData,
        patrimony: patrimony,
        maintenance: maintenance
    })
    await breakdownsRepository.save(newBreakdown)
  }

  async getAllBreakdowns() {
    const breakdown = await breakdownsRepository.createQueryBuilder(
        "avaria"
    )
    .leftJoinAndSelect('avaria.patrimony', 'patrimony')
    .leftJoinAndSelect('avaria.maintenance', 'maintenance')
    .select([
        'avaria.id_avaria',
        'avaria.descricao',
        'avaria.data_avaria',
        'patrimony.nome_patrimonio',
        'maintenance.descricao_servico'
    ])
    .getMany()

    return breakdown
  }

  async getBreakdownById(id_avaria: string) {
    const breakdown = await breakdownsRepository.findOne({where: {id_avaria}})
    if(!breakdown) {
        throw new NotFoundError('Avaria não encontrada')
    }
    const {...breakdownData} = breakdown
    return breakdownData
  }
  
  

  async updateBreakdown(id_avaria: string, breakdownData: any) {
    const breakdown = await breakdownsRepository.findOne({where: {id_avaria}});
    if (!breakdown) {
      throw new NotFoundError("Avaria não encontrada");
    }

    const patrimony = await patrimonyRepository.findOne({
        where: {id_patrimonio: breakdownData.id_patrimonio}
    })
    if(!patrimony){
        throw new BadRequestError('Patrimônio não encontrado')
    }

    const maintenance = await MaintenanceRepository.findOne({
        where: {id_manutencao: breakdownData.id_manutencao}
    })
    if(!maintenance) {
        throw new BadRequestError('Manutenção não encontrada')
    }

    Object.assign(breakdown, {
        ...breakdownData,
        patrimony,
        maintenance
    })

    await breakdownsRepository.save(breakdown)
  }

  async deleteBreakdown(id_avaria: string) {
    const breakdown = await breakdownsRepository.findOne({where: {id_avaria}});

    if (!breakdown) {
      throw new NotFoundError("Avaria não encontrada");
    }

    await breakdownsRepository.remove(breakdown);
  }
}
