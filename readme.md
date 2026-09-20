# API Segurança Node.js

API REST desenvolvida em **Node.js** com **Express**, **PostgreSQL** e **Sequelize**, com foco em autenticação, autorização e controle de acesso baseado em **Roles e Permissões (ACL)**.

O projeto foi desenvolvido como uma aplicação de estudo/prática dos principais conceitos de segurança em APIs REST, incluindo autenticação de usuários, geração e validação de tokens JWT, controle de acesso e persistência de dados em banco de dados relacional.

---

## 🎯 Objetivo do Projeto

O objetivo do projeto é desenvolver uma API REST capaz de controlar o acesso de usuários aos recursos da aplicação por meio de:

* Cadastro de usuários;
* Autenticação utilizando JWT;
* Controle de acesso autenticado;
* Criação e gerenciamento de Roles;
* Criação e gerenciamento de Permissões;
* Associação entre usuários e Roles;
* Associação entre usuários e Permissões;
* Associação entre Roles e Permissões;
* Controle de acesso baseado em permissões;
* Gerenciamento de produtos;
* Persistência dos dados utilizando PostgreSQL;
* Versionamento da estrutura do banco utilizando migrations do Sequelize;
* Execução da aplicação utilizando Docker e Docker Compose.

---

## 🛠️ Tecnologias Utilizadas

### Backend

* **Node.js** — ambiente de execução JavaScript;
* **Express.js** — criação da API REST;
* **JavaScript** — linguagem utilizada no backend;
* **JWT (JSON Web Token)** — autenticação dos usuários;
* **bcryptjs** — criptografia/hash de senhas;
* **Sequelize** — ORM para comunicação com o banco de dados;
* **Sequelize CLI** — gerenciamento de migrations;
* **UUID** — geração de identificadores;
* **dotenv** — gerenciamento de variáveis de ambiente.

### Banco de Dados

* **PostgreSQL 15**

### Containerização

* **Docker**
* **Docker Compose**

---

## 🔐 Segurança e Controle de Acesso

A API possui um sistema de autenticação e autorização baseado em JWT.

O fluxo principal funciona da seguinte forma:

```text
Usuário
   │
   ▼
Login
   │
   ▼
API valida usuário e senha
   │
   ▼
JWT gerado
   │
   ▼
Cliente envia JWT nas requisições
   │
   ▼
Middleware de autenticação
   │
   ▼
Usuário autenticado
   │
   ▼
Verificação de Role/Permissão
   │
   ▼
Acesso ao recurso
```

O projeto utiliza três conceitos principais:

### Autenticação

Responsável por verificar a identidade do usuário.

Exemplo:

```http
POST /auth/login
```

### Roles

Representam funções ou grupos de acesso dentro da aplicação.

Exemplos:

```text
Administrador
Usuário
Gerente
```

### Permissões

Representam ações que determinado usuário pode executar.

Exemplos:

```text
Listar
Criar
Editar
Excluir
```

A combinação entre **usuários, roles e permissões** permite implementar um controle de acesso baseado em ACL.

---

## 📁 Estrutura do Projeto

```text
seguranca-nodejs/
│
├── api/
│   ├── config/
│   │   ├── config.js
│   │   └── jsonSecret.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── permissaoController.js
│   │   ├── produtoController.js
│   │   ├── roleController.js
│   │   ├── segurancaController.js
│   │   └── usuarioController.js
│   │
│   ├── middleware/
│   │   ├── autenticado.js
│   │   ├── permissoes.js
│   │   └── roles.js
│   │
│   ├── migrations/
│   │   ├── create-produtos.js
│   │   ├── create-usuarios.js
│   │   ├── create-roles.js
│   │   ├── create-permissoes.js
│   │   ├── create-usuario-roles.js
│   │   ├── create-usuarios-permissoes.js
│   │   └── create-roles-permissoes.js
│   │
│   ├── models/
│   │   ├── index.js
│   │   ├── usuarios.js
│   │   ├── roles.js
│   │   ├── permissoes.js
│   │   ├── produtos.js
│   │   ├── usuario_roles.js
│   │   ├── usuarios_permissoes.js
│   │   └── roles_permissoes.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── usuariosRoutes.js
│   │   ├── roles.js
│   │   ├── permissao.js
│   │   ├── produtoRoute.js
│   │   └── seguranca.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── permissaoService.js
│   │   ├── produtoService.js
│   │   ├── roleService.js
│   │   ├── segurancaService.js
│   │   └── usuarioService.js
│   │
│   └── index.js
│
├── Dockerfile
├── .dockerignore
├── .env
├── .env.example
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

# 🐳 Executando com Docker

## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Docker
* Docker Compose

Verifique as instalações:

```bash
docker --version
```

```bash
docker compose version
```

---

## 1. Clonar o projeto

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd seguranca-nodejs
```

---

## 2. Configurar as variáveis de ambiente

O projeto utiliza um arquivo `.env` para armazenar as configurações da aplicação e do banco de dados.

Crie o arquivo `.env` a partir do arquivo `.env.example`:

### Windows

```bash
copy .env.example .env
```

### Linux/macOS

```bash
cp .env.example .env
```

Depois, ajuste os valores conforme necessário.

Exemplo:

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=123456
POSTGRES_DB=seguranca_nodejs_development

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_CONTAINER_PORT=5432

SECRET_KEY=chave_secreta
```

> **Importante:** dentro do Docker Compose, a API deve utilizar `postgres` como `POSTGRES_HOST`, pois esse é o nome do serviço do banco na rede interna do Docker.

---

# 🚀 Executando com Docker Compose

Com o Docker em execução, execute:

```bash
docker compose up --build
```

O parâmetro `--build` força a construção da imagem da API utilizando o `Dockerfile`.

Para executar os containers em segundo plano:

```bash
docker compose up --build -d
```

Verifique os containers:

```bash
docker compose ps
```

Para visualizar os logs:

```bash
docker compose logs -f
```

Para visualizar somente os logs da API:

```bash
docker compose logs -f api
```

Para visualizar somente os logs do PostgreSQL:

```bash
docker compose logs -f postgres
```

---

# 🗄️ Executando as Migrations

Depois que os containers estiverem em execução, as tabelas do banco podem ser criadas utilizando as migrations do Sequelize.

Execute:

```bash
docker compose exec api npx sequelize-cli db:migrate
```

Para verificar o estado das migrations:

```bash
docker compose exec api npx sequelize-cli db:migrate:status
```

Caso seja necessário desfazer a última migration:

```bash
docker compose exec api npx sequelize-cli db:migrate:undo
```

---

# 🔌 Acesso à API

A aplicação utiliza a porta:

```text
3000
```

Após iniciar os containers, a API estará disponível em:

```text
http://localhost:3000
```

A porta do PostgreSQL utilizada pelo host pode ser configurada no `.env`.

---

# 📌 Principais Endpoints

## Autenticação

### Cadastro

```http
POST /usuarios
```

### Login

```http
POST /auth/login
```

---

## Usuários

```http
GET    /usuarios
GET    /usuarios/:id
PUT    /usuarios/:id
DELETE /usuarios/:id
```

As operações de usuários utilizam autenticação.

---

## Roles

```http
POST   /roles
GET    /role
GET    /role/:id
PUT    /role/:id
DELETE /role/:id
```

---

## Permissões

```http
POST   /permissao
GET    /permissao
GET    /permissao/:id
PUT    /permissao/:id
DELETE /permissao/:id
```

---

## Produtos

```http
POST   /produto
GET    /produto
GET    /produto/id/:id
PUT    /produto/id/:id
DELETE /produto/id/:id
```

O acesso aos produtos pode ser condicionado às permissões configuradas para o usuário.

---

## Configuração de Segurança

O projeto possui endpoints destinados à configuração das relações entre:

```text
Usuário
   │
   ├── Roles
   │      │
   │      └── Permissões
   │
   └── Permissões
```

Endpoints relacionados:

```http
POST /seguranca/acl
POST /seguranca/permissoes-roles
```

---

# 🧩 Sequelize

O projeto utiliza Sequelize como ORM.

As migrations estão localizadas em:

```text
api/migrations/
```

Os models estão localizados em:

```text
api/models/
```

A configuração de conexão com o PostgreSQL está localizada em:

```text
api/config/config.js
```

---

# 🐘 PostgreSQL

O PostgreSQL é executado em um container separado.

O Docker Compose utiliza:

```yaml
postgres:
  image: postgres:15
```

Os dados do banco são armazenados em um volume Docker:

```text
postgres_data
```

Isso permite que os dados sejam mantidos mesmo quando os containers forem recriados.

---

# 🛑 Parando a aplicação

Para parar os containers:

```bash
docker compose stop
```

Para parar e remover os containers:

```bash
docker compose down
```

Para parar, remover os containers e também o volume do banco:

```bash
docker compose down -v
```

> ⚠️ O comando `docker compose down -v` remove o volume do PostgreSQL e, consequentemente, os dados armazenados nele.

---

# 🧹 Reconstruindo a aplicação

Caso sejam realizadas alterações no código, dependências ou `Dockerfile`, pode ser necessário reconstruir a imagem:

```bash
docker compose down
```

Depois:

```bash
docker compose up --build
```

---

# 🔒 Variáveis de Ambiente

O arquivo `.env` contém informações sensíveis e **não deve ser versionado no Git**.

O projeto disponibiliza o arquivo:

```text
.env.example
```

como modelo para configuração das variáveis necessárias.

Exemplo:

```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_CONTAINER_PORT=
SECRET_KEY=
```

---

# 📚 Conceitos Aplicados

Este projeto utiliza conceitos importantes do desenvolvimento de APIs:

* API REST;
* Node.js;
* Express;
* PostgreSQL;
* ORM;
* Sequelize;
* Migrations;
* JWT;
* Autenticação;
* Autorização;
* Middleware;
* Roles;
* Permissões;
* ACL;
* Hash de senhas;
* Variáveis de ambiente;
* Docker;
* Docker Compose;
* Containers;
* Volumes;
* Comunicação entre containers.

---

# 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos e de estudo, com foco no desenvolvimento de APIs Node.js e implementação de mecanismos de autenticação e autorização.

**Tecnologias principais:**

```text
Node.js
Express
PostgreSQL
Sequelize
JWT
Docker
Docker Compose
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
