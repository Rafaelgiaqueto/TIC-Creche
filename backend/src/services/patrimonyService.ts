import { patrimonyRepository } from "../repositories/patrimonyRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-erros";
import { categoryRepository } from "../repositories/categoryRepository";
import { localPatrimonyRepository } from "../repositories/localPatrimonyRepository";
import { DataSource } from "typeorm";

export class PatrimonyService {
  async createPatrimony(userId: string, patrimonyData: any) {
    const patrimonyExists = await patrimonyRepository.findOne({
      where: { nome_patrimonio: patrimonyData.nome_patrimonio },
    });
    if (patrimonyExists) {
      throw new BadRequestError("Patrimônio já cadastrado");
    }

    const category = await categoryRepository.findOne({
      where: { id_categoria: patrimonyData.id_categoria },
    });

    if (!category) {
      throw new BadRequestError("Categoria não encontrada");
    }

    const local = await localPatrimonyRepository.findOne({
      where: { id_local_patrimonio: patrimonyData.id_local_patrimonio },
    });

    if (!local) {
      throw new BadRequestError("Local de patrimônio não encontrado");
    }

    const newPatrimony = patrimonyRepository.create({
      ...patrimonyData,
      user: { id: userId },
      category: category,
      localPatrimony: local,
    });

    await patrimonyRepository.save(newPatrimony);
  }
  

  async getAllPatrimonys() {
    return await patrimonyRepository
    .createQueryBuilder('patrimonio')
    .leftJoinAndSelect('patrimonio.localPatrimony', "localPatrimony")
    .leftJoinAndSelect('patrimonio.category', "category")
    .getMany()
  }

  async getPatrimonysById(id_patrimonio: string) {
    const patrimony = await patrimonyRepository.findOne({ where: { id_patrimonio } });
    if (!patrimony) {
      throw new NotFoundError('Patrimônio não encontrado');
    }
    const { ...patrimonyData } = patrimony;
    return patrimonyData;
  }

  async updatePatrimony(id_patrimonio: string, patrimonyData: any) {
    const patrimony = await patrimonyRepository.findOne({ where: { id_patrimonio } });
    if (!patrimony) {
      throw new NotFoundError("Patrimônio não encontrado!");
    }

    const category = await categoryRepository.findOne({ where: { id_categoria: patrimonyData.id_categoria } });
    if (!category) {
      throw new BadRequestError("Categoria não encontrada");
    }

    const local = await localPatrimonyRepository.findOne({ where: { id_local_patrimonio: patrimonyData.id_local_patrimonio } });
    if (!local) {
      throw new BadRequestError("Local de patrimônio não encontrado");
    }

    Object.assign(patrimony, {
      ...patrimonyData,
      category,
      localPatrimony: local,
    });

    await patrimonyRepository.save(patrimony);
  }
  

  async deletePatrimony(id_patrimonio: string) {
    const patrimony = await patrimonyRepository.findOne({ where: { id_patrimonio } });
  
    if (!patrimony) {
      throw new NotFoundError("Patrimônio não encontrado");
    }
    
    await patrimonyRepository.remove(patrimony);
  }
  
}
