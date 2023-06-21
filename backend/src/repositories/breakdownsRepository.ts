import { AppDataSource } from "../data-source";
import { Breakdowns } from "../entities/Breakdowns";

export const breakdownsRepository = AppDataSource.getRepository(Breakdowns) 