import { AppDataSource } from "../data-source";
import { Patrimony } from "../entities/Patrimony";

export const patrimonyRepository = AppDataSource.getRepository(Patrimony) 