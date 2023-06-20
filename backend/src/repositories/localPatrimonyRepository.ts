import { AppDataSource } from "../data-source";
import { Local_patrimony } from "../entities/Local_patrimony";

export const localPatrimonyRepository = AppDataSource.getRepository(Local_patrimony) 