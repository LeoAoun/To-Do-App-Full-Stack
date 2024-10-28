# To-Do List App

## Descrição

O **To-Do List App** é uma aplicação completa de lista de tarefas, desenvolvida com tecnologias modernas que lidam com o front-end, back-end e banco de dados. A aplicação utiliza containers Docker para facilitar a implantação e o gerenciamento. Os usuários podem registrar, fazer login e gerenciar suas tarefas de forma eficiente, com recursos que incluem filtragens por prioridade, data de criação, completude e ordem alfabética.

## Tecnologias Utilizadas

- **Front-end**: [React](https://reactjs.org/)
- **Back-end**: [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) com [Prisma ORM](https://www.prisma.io/)
- **Containerização**: [Docker](https://www.docker.com/)
- **Gerenciamento de Dependências**: [npm](https://www.npmjs.com/)

## Funcionalidades

- Registro de usuários
- Login e autenticação
- Criação, leitura, atualização e exclusão (CRUD) de tarefas
- Filtragem de tarefas por:
  - Prioridade
  - Data de criação
  - Completude
  - Ordem alfabética
- Interface de usuário intuitiva

## Como Usar

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Você pode baixar o Docker [aqui](https://www.docker.com/get-started).

### Executando o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/to-do-app.git
cd to-do-app
```
2. Rodar o projeto:
```bash
docker-compose up -d
```

3. Abrir no navegador
   [http://localhost:3000](http://localhost:3000)
