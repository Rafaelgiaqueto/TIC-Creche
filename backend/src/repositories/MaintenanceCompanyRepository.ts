import { AppDataSource } from "../data-source";
import { MaintenanceCompany } from "../entities/MaintenanceCompany";

export const MaintenanceCompanyRepository = AppDataSource.getRepository(MaintenanceCompany) 