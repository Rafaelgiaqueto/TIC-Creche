import express from 'express';
import cors from 'cors';
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { PatrimonyController } from './controllers/PatrimonyController' 
import { CategoryController } from './controllers/CategoryController'
import { validate } from './middlewares/validate';
import { createUserDto } from './schemas/createUserDto';
import { authMiddleware } from './middlewares/authMiddleware';
import { ResetPasswordController } from './controllers/ResetPasswordController';
import { LocalPatrimonyController } from './controllers/LocalPatrimonyController';
import { MaintenanceCompanyController } from './controllers/MaintenanceCompanyController';
import { MaintenanceController } from './controllers/MaintenanceController';
import { BreakdownsController } from './controllers/breakdownsController';


const app = express();

// adicionando o middleware cors
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const userController = new UserController();
const loginController = new LoginController();
const patrimonyController = new PatrimonyController(); 
const resetPasswordController = new ResetPasswordController()
const categoryController = new CategoryController();
const localPatrimonyController = new LocalPatrimonyController()
const maintenanceCompanyController = new MaintenanceCompanyController();
const maintenanceController = new MaintenanceController();
const breakdownsController = new BreakdownsController();


// Logar com usuário cadastrado
app.post('/frontend/login', loginController.login);
app.post('/reset-password', resetPasswordController.sendResetPasswordEmail);

// CRUD USUÁRIOS //
// Criar usuário
app.post('/users', validate(createUserDto), userController.createUser);
// Listagem de usuários
app.get('/users', userController.getUsers);
// Buscar usuário por UUID
app.get('/users/:id', userController.getUsersById);
// Atualizar usuário
app.put('/users/:id', userController.updateUser);
// Deletar usuário
app.delete('/user/:id', userController.deleteUser);

// CRUD PATRIMONIO
// Cadastrar patrimônio
app.post('/patrimony',authMiddleware,  patrimonyController.createPatrimony);
// Listagem de patrimônios
app.get('/patrimony', patrimonyController.getPatrimonys);
// Buscar patrimônio por UUID
app.get('/patrimony/:id_patrimonio', patrimonyController.getPatrimonysById)
// Atualizar patrimonio
app.patch('/patrimony/:id' , patrimonyController.updatePatrimony)
// Deletar patrimônio
app.delete('/patrimony/:id_patrimonio', patrimonyController.deletePatrimony)


// CRUD CATEGORIA
// Criar categoria
app.post('/category', authMiddleware, categoryController.createCategory);
// Listagem de categorias
app.get('/category', categoryController.getAllCategories);
// Buscar categoria por UUID
app.get('/categories/:id_categoria', categoryController.getCategoryById);
// Atualizar categoria pelo id
app.put('/category/:id_categoria', categoryController.updateCategoryById);
// Atualizar a categoria
app.patch('/category', categoryController.updateCategory)
// Deletar categoria
app.delete('/categories/:id_categoria', categoryController.deleteCategory);

// CRUD LOCAL
// Criar local do patrimônio
app.post('/local-patrimony', authMiddleware, localPatrimonyController.createLocalPatrimony);
// Listagem de locais do patrimônio
app.get('/local-patrimony', localPatrimonyController.getAllLocalPatrimony);
// Listar patrimonio por ID
app.get('/local-patrimony/:id_local_patrimonio', localPatrimonyController.getLocalPatrimonyById);
// Listar patrimonio por nome
app.get('/local-patrimony/:nome_local', localPatrimonyController.getLocalPatrimonyByName);
// Atualizar local do patrimônio pelo ID
app.put('/local-patrimony/:id_local_patrimonio', localPatrimonyController.updateLocalPatrimony);
// Atualizar local
app.patch('/local-patrimony', localPatrimonyController.updateLocalPatrimony);
// Deletar local do patrimônio
app.delete('/local-patrimony/:id_local_patrimonio', localPatrimonyController.deleteLocalPatrimony);



// CRUD AVARIAS
// Criar avaria
app.post('/breakdowns', breakdownsController.createBreakdown);
// Listagem de avarias
app.get('/breakdowns', breakdownsController.getAllBreakdowns);
// Buscar avaria por UUID
app.get('/breakdowns/:id_avaria', breakdownsController.getBreakdownById);
// Atualizar avaria
app.put('/breakdowns/:id_avaria', breakdownsController.updateBreakdown);
// Deletar avaria
app.delete('/breakdowns/:id_avaria', breakdownsController.deleteBreakdown);




// Criar manutenção
app.post('/maintenances', maintenanceController.createMaintenance);
// Listagem de manutenções
app.get('/maintenances', maintenanceController.getAllMaintenances);
// Buscar manutenção por ID
app.get('/maintenances/:id_manutencao', maintenanceController.getMaintenanceById);
// Atualizar manutenção pelo ID
app.put('/maintenances/:id_manutencao', maintenanceController.updateMaintenanceById);
// Deletar manutenção
app.delete('/maintenances/:id_manutencao', maintenanceController.deleteMaintenance);


// Criar empresa de manutenção
app.post('/maintenance-companies', maintenanceCompanyController.createMaintenanceCompany);
// Listagem de empresas de manutenção
app.get('/maintenance-companies', maintenanceCompanyController.getAllMaintenanceCompanys);
// Buscar empresa de manutenção por ID
app.get('/maintenance-companies/:id_empresa_manutencao', maintenanceCompanyController.getMaintenanceCompanyById);
// Atualizar empresa de manutenção pelo ID
app.put('/maintenance-companies/:id_empresa_manutencao', maintenanceCompanyController.updateMaintenanceCompanyById);
// Deletar empresa de manutenção
app.delete('/maintenance-companies/:id_empresa_manutencao', maintenanceCompanyController.deleteMaintenanceCompany);

export default app;
