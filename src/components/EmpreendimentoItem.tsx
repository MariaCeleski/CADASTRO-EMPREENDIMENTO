import type { Empreendimento } from "../types/Empreendimento";

type Props = {
  emp: Empreendimento;
  onDelete: (id: string) => void;
  onEdit: (emp: Empreendimento) => void;
};

export function EmpreendimentoItem({ emp, onDelete, onEdit }: Props) {
  const isAtivo = emp.status === "ativo";

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="uppercase font-bold text-gray-100 text-lg tracking-wider">
          {emp.nome}
        </h3>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isAtivo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isAtivo ? "Ativo" : "Inativo"}
        </span>
      </div>

      {/* INFO */}
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p><strong>Cnpj:</strong> {emp.cnpj}</p>
        <p><strong>Empreendedor:</strong> {emp.empreendedor}</p>
        <p><strong>Tipo de empreendimento:</strong> {emp.tipo}</p>
        <p><strong>CEP:</strong> {emp.cep}</p>
        <p><strong>Logradouro:</strong> {emp.logradouro}</p>
        <p><strong>Número:</strong> {emp.numero}</p>
        <p><strong>Complemento:</strong> {emp.complemento}</p>
        <p><strong>Bairro:</strong> {emp.bairro}</p>
        <p><strong>Município:</strong> {emp.municipio}</p>
        <p><strong>UF:</strong> {emp.uf}</p>
        <p><strong>Email:</strong> {emp.email}</p>
        <p><strong>Telefone:</strong> {emp.telefone}</p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(emp)}
          className="flex-1 bg-blue-300 hover:bg-blue-800 text-white py-2 rounded-xl transition-colors duration-200"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(emp.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition-colors duration-200"
        >
          Excluir
        </button>
      </div>

    </div>
  );
}