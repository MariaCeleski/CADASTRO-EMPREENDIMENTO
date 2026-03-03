
# 📌 empreendedorismo-sc

Sistema web administrativo desenvolvido para cadastro, gerenciamento e organização de empreendimentos do estado de Santa Catarina.

A aplicação permite o controle completo de dados empresariais, incluindo classificação por tipo, controle de status (ativo/inativo), validação inteligente de dados e auto-preenchimento de endereço via CEP.

---

## 🎥 Vídeo Pitch

O vídeo de apresentação do projeto pode ser acessado no link abaixo:

🔗 [Assista ao vídeo pitch no YouTube](https://www.youtube.com/watch?v=9hCGrrXkFAk)

## 📖 Descrição da Solução

O **empreendedorismo-sc** é uma aplicação web construída com foco em organização, usabilidade e boas práticas de desenvolvimento front-end.

A solução foi criada para facilitar o cadastro e gerenciamento de empreendimentos, permitindo:

- Cadastro completo de empreendimentos
- Classificação por tipo (Comércio, Serviço, Industrial, etc.)
- Controle de status (Ativo/Inativo)
- Validação de dados em tempo real
- Máscaras automáticas para telefone e CEP
- Auto-preenchimento de endereço via API ViaCEP
- Interface administrativa moderna em Dark Mode
- Edição e atualização de registros

O sistema foi projetado seguindo princípios de componentização, separação de responsabilidades e fluxo de dados unidirecional.

---

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- ReactJS
- TypeScript
- Vite
- Tailwind CSS
- UUID (geração de identificadores únicos)
- API ViaCEP (consulta automática de endereço)

---

empreendedorismo-sc/
│
├── src/
│   ├── components/
│   │   ├── EmpreendimentoForm.tsx
│   │   ├── EmpreendimentoList.tsx
│   │   └── EmpreendimentoItem.tsx
│   │
│   ├── types/
│   │   └── Empreendimento.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
├── package.json
├── tsconfig.json
└── README.md


---

## 🧩 Arquitetura e Organização

O projeto segue uma arquitetura baseada em **componentização e separação de responsabilidades**, organizada da seguinte forma:

### 📁 components/

Contém os componentes reutilizáveis da aplicação:

- **EmpreendimentoForm.tsx**
  - Cadastro e edição de empreendimentos
  - Validação de campos
  - Máscaras de telefone e CEP
  - Integração com API ViaCEP
  - Controle de estado do formulário

- **EmpreendimentoList.tsx**
  - Renderiza a lista de empreendimentos cadastrados
  - Controla a renderização dinâmica
  - Organiza os itens na interface administrativa

- **EmpreendimentoItem.tsx**
  - Representa individualmente cada empreendimento
  - Exibe informações principais
  - Permite edição
  - Permite alteração de status

---

### 📁 types/

- **Empreendimento.ts**
  - Define a interface tipada da estrutura de dados
  - Garante segurança de tipos com TypeScript
  - Padroniza os objetos manipulados pelo sistema

---

### 📁 Arquivos Principais

- **App.tsx**
  - Componente raiz da aplicação
  - Gerencia o estado global dos empreendimentos
  - Controla o fluxo entre formulário e listagem

- **main.tsx**
  - Ponto de entrada da aplicação React

- **index.css**
  - Arquivo global de estilos
  - Importação do Tailwind CSS
  - Configuração do tema dark administrativo
  - Customizações visuais globais

---

## 🔄 Fluxo de Dados da Aplicação

1. O usuário preenche o formulário (`EmpreendimentoForm`).
2. Os dados são validados localmente.
3. Um objeto do tipo `Empreendimento` é criado.
4. O estado global é atualizado no `App.tsx`.
5. A lista (`EmpreendimentoList`) é re-renderizada automaticamente.
6. Cada item é exibido por meio do `EmpreendimentoItem`.

A aplicação segue o princípio de **fluxo de dados unidirecional (React Data Flow)**, garantindo previsibilidade, organização e facilidade de manutenção.

---

## ▶️ Instruções para Execução

### 1️⃣ Clonar o repositório

git clone https://github.com/seu-usuario/empreendedorismo-sc.git


### 2️⃣ Acessar a pasta do projeto
cd empreendedorismo-sc


### 3️⃣ Instalar as dependências
npm install 
ou
yarn install


### 4️⃣ Executar o projeto
npm run dev


A aplicação estará disponível em:
http://localhost:5173


---

## ✨ Diferenciais da Solução

- Interface administrativa moderna (Dark Mode)
- Estrutura escalável e organizada
- Validação inteligente de campos
- Máscaras automáticas de entrada
- Auto-preenchimento de endereço via API
- Código tipado com TypeScript
- Arquitetura baseada em boas práticas de desenvolvimento

---

## 📌 Considerações Finais

O projeto **empreendedorismo-sc** foi desenvolvido com foco em organização, escalabilidade e experiência do usuário, aplicando conceitos modernos de desenvolvimento front-end, componentização e tipagem forte.

A estrutura modular facilita futuras melhorias, como integração com backend, banco de dados ou autenticação de usuários.
=======









