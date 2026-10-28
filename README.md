# TreinaCreator — Gerenciador de Treinamentos

Projeto individual da disciplina **Programação Front-End 01**.

O TreinaCreator é uma aplicação web para organizar treinamentos voltados a criadores de conteúdo. É possível **listar, buscar, cadastrar, editar e excluir** treinamentos. O front-end utiliza **Next.js (App Router)** e se comunica com uma **API Node.js + Express**.

## Proposta inicial

- **Nome:** TreinaCreator — Gerenciador de Treinamentos para Criadores.
- **Objetivo:** organizar cursos e treinamentos com informações de fácil consulta e manutenção.
- **Usuário principal:** criadores de conteúdo que desejam planejar seu aprendizado.
- **Dados gerenciados:** ID, título, descrição, categoria e duração dos treinamentos.
- **Escopo:** apenas treinamentos, sem banco de dados, autenticação ou inscrições.

## Requisitos

- Node.js 20.9 ou superior (recomendada a versão LTS).
- npm (vem junto com o Node.js).
- VS Code ou outro editor de código.

## Como executar

Abra **dois terminais** na pasta do projeto:

**Terminal 1 — API:**

```bash
cd backend
npm install
npm start
```

A API estará em **http://localhost:3001/treinamento**.

**Terminal 2 — interface:**

```bash
cd frontend
npm install
npm run dev
```

Acesse **http://localhost:3000** no navegador. Mantenha os dois terminais abertos.

> **Importante:** os dados são armazenados em um array na memória do Express, conforme o enunciado. Ao reiniciar o back-end, a lista volta aos três treinamentos de exemplo.

Se precisar mudar o endereço da API, crie `frontend/.env.local` com o conteúdo indicado em `frontend/.env.example` e reinicie o Next.js.

## Páginas

| Endereço | Função |
| --- | --- |
| `/` | Página inicial |
| `/treinamento` | Listagem, busca e exclusão |
| `/adicionar-treinamento` | Cadastro |
| `/editar-treinamentos/1` | Edição do treinamento de ID 1 |

## API (Express)

| Método | Rota | Ação |
| --- | --- | --- |
| GET | `/treinamento` | Listar todos |
| GET | `/treinamento/:id` | Buscar um |
| POST | `/treinamento` | Cadastrar |
| PUT | `/treinamento/:id` | Atualizar |
| DELETE | `/treinamento/:id` | Excluir |

Exemplo de JSON para `POST` e `PUT`:

```json
{
  "titulo": "Como editar vídeos",
  "descricao": "Aprenda técnicas básicas de edição para YouTube.",
  "categoria": "Edição",
  "duracao": "2h"
}
```

O servidor valida os campos e retorna `400` para dados inválidos ou `404` para um treinamento inexistente.

## Testes da API

Na pasta `backend`, execute:

```bash
npm test
```

O teste verifica as operações de listar, cadastrar, consultar por ID, editar, excluir e validar os dados.

## Estrutura principal

```text
ATV_PFEND1_INDIVIDUAL/
├── backend/
│   ├── server.js                  # API e array de treinamentos
│   └── tests/api.test.js          # Teste automatizado do CRUD
├── frontend/
│   └── src/
│       ├── app/                   # Páginas do Next.js
│       ├── components/            # Cabeçalho, formulário e alertas
│       └── lib/api.js             # Funções fetch da API
├── docs/                          # Enunciado original
└── GUIA_DE_ESTUDOS.md             # Roteiro para aprender tudo do zero
```

## Como demonstrar ao professor

1. Mostrar a página inicial e explicar as rotas do Next.js.
2. Abrir a listagem e pesquisar por um treinamento.
3. Cadastrar um treinamento e mostrar que ele apareceu na lista.
4. Editar o título e conferir a alteração.
5. Excluir o treinamento após a confirmação.
6. Abrir `http://localhost:3001/treinamento` para mostrar a resposta JSON.
7. Reiniciar o Express e explicar por que os dados retornaram ao estado inicial.

O projeto foi pensado para fins didáticos e execução local.
