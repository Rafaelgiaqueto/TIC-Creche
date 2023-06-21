import { AppDataSource } from "../data-source";
import { Maintenance } from "../entities/Maintenance";

export const MaintenanceRepository = AppDataSource.getRepository(Maintenance) 