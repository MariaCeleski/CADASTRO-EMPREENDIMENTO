import { useState, useEffect } from "react";
import type { Empreendimento } from "./types/Empreendimento";
import { EmpreendimentoForm } from "./components/EmpreendimentoForm";
import { EmpreendimentoList } from "./components/EmpreendimentoList";

function App() {
  const [lista, setLista] = useState<Empreendimento[]>(() => {
    const dados = localStorage.getItem("empreendimentos");
    return dados ? JSON.parse(dados) : [];
  });
  const [editingEmp, setEditingEmp] = useState<Empreendimento | null>(null);

  function handleSave(emp: Empreendimento) {
    if (editingEmp) {
      const atualizada = lista.map((e) => (e.id === emp.id ? emp : e));

      setLista(atualizada);
      localStorage.setItem("empreendimentos", JSON.stringify(atualizada));

      setEditingEmp(null);
    } else {
      const novaLista = [...lista, emp];

      setLista(novaLista);
      localStorage.setItem("empreendimentos", JSON.stringify(novaLista));
    }
  }

  function handleDelete(id: string) {
    const listaAtualizada = lista.filter((emp) => emp.id !== id);

    setLista(listaAtualizada);

    localStorage.setItem("empreendimentos", JSON.stringify(listaAtualizada));
  }

  const total = lista.length;
  const ativos = lista.filter((e) => e.status === "ativo").length;
  const inativos = lista.filter((e) => e.status === "inativo").length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl text-4xl font-bold text-gray-800">
            Cadastro de Empreendimentos
          </h1>
          <p className="text-2xl text-gray-500">
            Gestão de empreendimentos - Santa Catarina
          </p>
        </div>

        {/* CARDS DE ESTATÍSTICA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-gray-500">Total</h3>
            <p className="text-3xl font-bold text-blue-600">{total}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-gray-500">Ativos</h3>
            <p className="text-3xl font-bold text-green-600">{ativos}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-gray-500">Inativos</h3>
            <p className="text-3xl font-bold text-red-600">{inativos}</p>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white p-8 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-6">
            {editingEmp ? "Editar Empreendimento" : "Cadastrar Empreendimento"}
          </h2>

          <EmpreendimentoForm onSave={handleSave} editingEmp={editingEmp} />
        </div>

        {/* LISTA */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">
            Lista de Empreendimentos
          </h2>

          <EmpreendimentoList
            lista={lista}
            onDelete={handleDelete}
            onEdit={setEditingEmp}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
