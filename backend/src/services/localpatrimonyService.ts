import { localPatrimonyRepository } from "../repositories/localPatrimonyRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-erros";
import { patrimonyRepository } from "../repositories/patrimonyRepository";

export class LocalPatrimonyService {
  async createLocalPatrimony(nome_local: string, descricao: string) {
    const localPatrimonyExists = await localPatrimonyRepository.findOne({
      where: { nome_local },
    });
    if (localPatrimonyExists) {
      throw new BadRequestError("Local já cadastrado");
    }

    const newLocalPatrimony = localPatrimonyRepository.create({
      nome_local,
      descricao,
    });

    await localPatrimonyRepository.save(newLocalPatrimony);
  }

  async getAllLocalPatrimony() {
    return await localPatrimonyRepository.find();
  }

  async getLocalPatrimonyById(id_local_patrimonio: string) {
    const localPatrimony = await localPatrimonyRepository.findOne({
      where: { id_local_patrimonio },
    });

    if (!localPatrimony) {
      throw new NotFoundError("Local do patrimônio não encontrado");
    }

    return localPatrimony;
  }

  async getLocalPatrimonyByName(nome_local: string): Promise<string> {
    const localPatrimony = await localPatrimonyRepository.findOne({
      where: { nome_local },
    });
  
    if (!localPatrimony) {
      throw new Error("Local de Patrimônio não encontrado");
    }
  
    return localPatrimony.nome_local;
  }

  async updateLocalPatrimony(
    id_local_patrimonio: string,
    nome_local?: string,
    descricao?: string
  ) {
    const localPatrimony = await localPatrimonyRepository.findOne({
      where: { id_local_patrimonio },
    });

    if (!localPatrimony) {
      throw new NotFoundError("Local do patrimônio não encontrado");
    }

    if (nome_local) {
      localPatrimony.nome_local = nome_local;
    }

    if (descricao) {
      localPatrimony.descricao = descricao;
    }

    await localPatrimonyRepository.save(localPatrimony);
  }

  async deleteLocalPatrimony(id_local_patrimonio: string) {
    // Verificar se existem patrimônios associados ao local do patrimônio
    const patrimonios = await patrimonyRepository
      .createQueryBuilder("patrimony")
      .leftJoin("patrimony.localPatrimony", "localPatrimony")
      .where("localPatrimony.id_local_patrimonio = :id_local_patrimonio", {
        id_local_patrimonio,
      })
      .getMany();

    if (patrimonios.length > 0) {
      throw new Error(
        "Há patrimônios relacionados a este local. Antes de excluí-lo, atualize o local dos patrimônios relacionados."
      );
    }

    // Excluir o local do patrimônio
    const localPatrimony = await localPatrimonyRepository.findOne({
      where: { id_local_patrimonio },
    });
    if (!localPatrimony) {
      throw new NotFoundError("Local do patrimônio não encontrado");
    }

    await localPatrimonyRepository.remove(localPatrimony);
  }
}
