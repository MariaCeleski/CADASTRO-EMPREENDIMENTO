export interface Empreendimento {
  id: string;
  nome: string;
  cnpj: string;
  empreendedor: string;
  municipio: string;
  tipo: string;
  email: string;
  status: "ativo" | "inativo";
  telefone: string;  
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
}