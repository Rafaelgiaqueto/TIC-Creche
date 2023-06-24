# TIC-Creche

Projeto desenvolvido para controle de patrimônio da creche NV Sociedade Solidária

## Ferramentas

- NodeJs
- npm
- Typescript
- PostgreSQL
- Gerenciador de banco de dados (PGAdmin4 por exemplo)

## Estrutura

    ├── backend                    
    ├── frontend                     
    └── README.md
    
    .
    ├── backend
    ├── ...
    ├── src
    │   ├── @types
    │   ├── controller          # API/controladores de cada entidade
    │   ├── entities            # Entidades envolvidas no projeto
    │   ├── helpers             # Tratamento de erros no backend
    |   ├── middlewares         # Autenticação
    │   ├── migrations          # Database
    │   ├── repositories        # Dados
    │   ├── schemas             # Validação
    |   ├── data-source.ts      # Conexão Banco 
    |   ├── index.ts            # Servidor
    │   └── routes.ts           # Rotas da aplicação
    └── ...
    
     .
    ├── frontend
    ├── ...
    ├── images
    │   ├── avarias.html              # Entidade de avarias
    │   ├── cadastro.html             # Cadastro de usuários
    │   ├── categorias.html           # Entidade de categorias
    |   ├── configuracoes.html        # Entidade de configuração
    │   ├── custom.css                # Customização CSS
    │   ├── dashboard.html            # Dashboard da aplicação/home
    │   ├── empresamanutencao.html    # Entidade de empresa
    |   ├── local.html                # Entidade de local
    |   ├── login.html                # Login de usuários
    │   └── manutencao.html           # Entidade de manutenção
    │   └── patrimonio.html           # Entidade de patrimônio
    │   └── usuarios.html             # Entidade de usuarios
    └── ...
    
    
## 🚀 Para iniciar

- Baixar o projeto;

- Instalar o Nodejs, npm e postgreSQL;

- Abra seu gerenciador de banco de dados e crie um database com o nome de sua escolha;

- Dentro da pasta backend no arquivo ".env" substitua as credencias pelas suas:
DB_NAME = NOME DO BANCO QUE CRIOU
DB_PASS = SENHA QUE UTILIZA PARA ENTRAR EM SEU GERENCIADOR;

- Baixar um cliente que suporte um SGBD para ver em uma interface mais bonita o cadastro das entidades assim como seus relacionamentos, recomendo Beekeper portable, aqui está uma instrução;
  - Exemplo de como conectar ao Beekeper:
    - Em "New Connection" selecionem a opção "postgres"
    - Em "User" digitem "postgres"
    - Em "Password" digitem a senha que voces usam pra entrar no pgadmin4, a mesma do .env
    - Em default Database coloquem o nome do banco de dados que você criou
    - Cliquem em "Connect", qualquer dúvida me falem

## 🚀 Para Rodar

- Dentro da pasta backend, rode o primeiro comando "npm install" para instalar as dependências do projeto;
- Após instalar, rode o comando ainda na pasta backend "npm run migration:run" para que as tabelas sejam criadas;
- Ao final, rode o comando "npm run dev" para iniciar o backend


## 🚀 Para visualizar as páginas

- Definimos a URL padrão para ser acessada pela rota "localhost3001/..", depois da barra deve ser passado o nome da entidade que quer acessar .html, exemplo: http://localhost:3001/cadastro.html

## Fluxo esperado

- Acessar a URL http://localhost:3001/cadastro.html e realizar um cadastro de um usuário;
- Acessar a URL http://localhost:3001/login.html ou clicar em "Já possui conta?";
- Entrar com as credencias criadas e abrir o menu com as entidades;
- Cadastrar primeiramente uma categoria e local onde serão armazenados os patrimônios cadastrados;
- Caso o patrimônio tenha uma avaria é necessário primeiro criar a empresa que realizou o serviço, logo após cadastrar o serviço que foi realizado e por último a avaria que o patrimônio sofreu.











    
