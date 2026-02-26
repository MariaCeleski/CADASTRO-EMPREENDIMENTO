import type { Empreendimento } from "../types/Empreendimento";
import { useState } from "react";
type Props = {
  emp: Empreendimento;
  onDelete: (id: string) => void;
  onEdit: (emp: Empreendimento) => void;
};

export function EmpreendimentoItem({ emp, onDelete, onEdit }: Props) {
  const isAtivo = emp.status === "ativo";
  const [copiado, setCopiado] = useState(false);

  function copiarId() {
    navigator.clipboard.writeText(emp.id);
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  }

  return (
    <div className="relative bg-gray-800 border-gray-800 p-6 rounded-2xl shadow-sm 
    hover:shadow-lg transition-all duration-300 border border-gray-100">
      {copiado && (
        <div
          className="absolute top-4 right-80 bg-green-600 text-white 
                      px-4 py-2 rounded-lg shadow-lg text-sm 
                      animate-fade-in"
        >
          ID copiado com sucesso ✔
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <span>{emp.id}</span>

            <button
              onClick={copiarId}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 
              text-xs font-medium rounded-full border border-gray-700 
              transition-all duration-150 active:scale-95 active:bg-gray-600"
            >
              📋 Copiar
            </button>
          </div>

          <h3 className="uppercase font-bold text-gray-100 text-xl tracking-wide">
            {emp.nome}
          </h3>
        </div>

        <span
          className={`px-5 py-2 text-sm font-semibold rounded-full border ${
            isAtivo
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"
          }`}
        >
          {isAtivo ? "ATIVO" : "INATIVO"}
        </span>
      </div>

      {/* INFO */}
      <div className="text-base text-gray-700 leading-relaxed space-y-2 mb-4">
        <p>
          <strong>Cnpj:</strong> {emp.cnpj}
        </p>
        <p>
          <strong>Empreendedor:</strong> {emp.empreendedor}
        </p>
        <p>
          <strong>Tipo de empreendimento:</strong> {emp.tipo}
        </p>
        <p>
          <strong>CEP:</strong> {emp.cep}
        </p>
        <p>
          <strong>Logradouro:</strong> {emp.logradouro}
        </p>
        <p>
          <strong>Número:</strong> {emp.numero}
        </p>
        <p>
          <strong>Complemento:</strong> {emp.complemento}
        </p>
        <p>
          <strong>Bairro:</strong> {emp.bairro}
        </p>
        <p>
          <strong>Município:</strong> {emp.municipio}
        </p>
        <p>
          <strong>UF:</strong> {emp.uf}
        </p>
        <p>
          <strong>Email:</strong> {emp.email}
        </p>
        <p>
          <strong>Telefone:</strong> {emp.telefone}
        </p>
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
