import { useState, useEffect } from "react";
import type { Empreendimento } from "../types/Empreendimento";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSave: (emp: Empreendimento) => void;
  editingEmp?: Empreendimento | null;
}

const initialState: Empreendimento = {
  id: "",
  nome: "",
  cnpj: "",
  empreendedor: "",
  tipo: "Comércio",
  municipio: "",
  email: "",
  status: "ativo",
  telefone: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  uf: "",
};

export function EmpreendimentoForm({ onSave, editingEmp }: Props) {
  const [form, setForm] = useState<Empreendimento>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingCep, setLoadingCep] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  useEffect(() => {
    if (editingEmp) {
      setForm(editingEmp);
    }
  }, [editingEmp]);

  function formatCep(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 8);
    return numbers.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
  }

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 10) {
      return numbers
        .replace(/^(\d{0,2})/, "($1")
        .replace(/^(\(\d{2})(\d{0,4})/, "$1) $2")
        .replace(/(\d{4})(\d{0,4})$/, "$1-$2")
        .replace(/-$/, "");
    }

    return numbers
      .replace(/^(\d{0,2})/, "($1")
      .replace(/^(\(\d{2})(\d{0,5})/, "$1) $2")
      .replace(/(\d{5})(\d{0,4})$/, "$1-$2")
      .replace(/-$/, "");
  }

  async function buscarCEP(cep: string) {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    try {
      setLoadingCep(true);
      setAutoFilled(false);

      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      const data = await response.json();

      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          municipio: data.localidade,
          uf: data.uf,
        }));

        setAutoFilled(true);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    } finally {
      setLoadingCep(false);
    }
  }

  function formatCNPJ(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 14);

    return numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/[-/]$/, "");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    if (name === "cep") {
      const formatted = formatCep(value);

      setForm((prev) => ({
        ...prev,
        cep: formatted,
      }));

      if (formatted.replace(/\D/g, "").length === 8) {
        buscarCEP(formatted);
      }

      return;
    }

    if (name === "cnpj") {
      setForm((prev) => ({
        ...prev,
        cnpj: formatCNPJ(value),
      }));
      return;
    }

    if (name === "telefone") {
      setForm((prev) => ({
        ...prev,
        telefone: formatPhone(value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!form.nome.trim()) {
      newErrors.nome = "Nome obrigatório";
    } else if (form.nome.trim().length < 3) {
      newErrors.nome = "Mínimo 3 caracteres";
    }

    if (!form.numero.trim()) {
      form.numero = "S/N";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email inválido";
    }

    if (form.telefone.replace(/\D/g, "").length < 10) {
      newErrors.telefone = "Telefone inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    const novoEmp: Empreendimento = {
      ...form,
      id: form.id || uuidv4(),
    };

    onSave(novoEmp);
    setForm(initialState);
    setErrors({});
    setAutoFilled(false);
  }

  function handleClear() {
    setForm(initialState);
    setErrors({});
    setAutoFilled(false);
  }

  const cardStyle =
    "w-full bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg";
  const inputStyle = (field: string) =>
    `w-full p-3 rounded-xl border bg-gray-800 text-gray-100 
   placeholder-gray-400 transition-all duration-200
   ${
     errors[field]
       ? "border-red-500 focus:ring-2 focus:ring-red-500"
       : "border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
   }`;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* DADOS GERAIS */}

      <div className={cardStyle}>
        <h3 className="text-lg font-semibold text-gray-200 mb-6">
          Dados Gerais
        </h3>

        <div className="grid gap-4">
          <div>
            <input
              name="nome"
              placeholder="Nome do empreendimento"
              value={form.nome}
              onChange={handleChange}
              className={inputStyle("nome")}
            />
            {errors.nome && (
              <p className="text-red-400 text-xs mt-1">{errors.nome}</p>
            )}
          </div>

          <div>
            <input
              name="cnpj"
              placeholder="CNPJ"
              value={form.cnpj}
              onChange={handleChange}
              maxLength={18}
              className={inputStyle("cnpj")}
            />
            {errors.cnpj && (
              <p className="text-red-400 text-xs mt-1">{errors.cnpj}</p>
            )}
          </div>

          <div>
            <input
              name="empreendedor"
              placeholder="Nome do empreendedor"
              value={form.empreendedor}
              onChange={handleChange}
              className={inputStyle("empreendedor")}
            />
            {errors.empreendedor && (
              <p className="text-red-400 text-xs mt-1">{errors.empreendedor}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">
              Tipo de Empreendimento
            </label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className={inputStyle("tipo")}
            >
              <option value="Comércio">Comércio</option>
              <option value="Serviço">Serviço</option>
              <option value="Indústria">Indústria</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Agronegócio">Agronegócio</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <label className="text-gray-300 text-sm">Status:</label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="ativo"
                checked={form.status === "ativo"}
                onChange={handleChange}
                className="accent-green-500"
              />
              Ativo
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="inativo"
                checked={form.status === "inativo"}
                onChange={handleChange}
                className="accent-red-500"
              />
              Inativo
            </label>
          </div>
        </div>
      </div>

      {/* ENDEREÇO */}
      <div className={cardStyle}>
        <h3 className="text-lg font-semibold text-gray-200 mb-6">
          Endereço
          {autoFilled && (
            <span className="ml-auto text-xs bg-green-900 text-green-400 px-3 py-1 rounded-full border border-green-700">
              Preenchido automaticamente
            </span>
          )}
        </h3>

        <div className="grid gap-4">
          <div className="relative">
            <input
              name="cep"
              placeholder="CEP"
              value={form.cep}
              onChange={handleChange}
              maxLength={9}
              className={inputStyle("cep")}
            />
            {loadingCep && (
              <div className="absolute right-3 top-3 w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>

          <input
            name="logradouro"
            placeholder="Logradouro"
            value={form.logradouro}
            onChange={handleChange}
            className={inputStyle("logradouro")}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="numero"
              placeholder="Número"
              value={form.numero}
              onChange={handleChange}
              className={inputStyle("numero")}
            />
            <input
              name="complemento"
              placeholder="Complemento"
              value={form.complemento}
              onChange={handleChange}
              className={inputStyle("complemento")}
            />
          </div>

          <input
            name="bairro"
            placeholder="Bairro"
            value={form.bairro}
            onChange={handleChange}
            className={inputStyle("bairro")}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="municipio"
              placeholder="Município"
              value={form.municipio}
              disabled={autoFilled}
              onChange={handleChange}
              className={inputStyle("municipio")}
            />
            <input
              name="uf"
              placeholder="UF"
              value={form.uf}
              disabled={autoFilled}
              onChange={handleChange}
              className={inputStyle("uf")}
            />
          </div>
        </div>
      </div>

      {/* CONTATO */}
      <div className={cardStyle}>
        <h3 className="text-lg font-semibold text-gray-200 mb-6">Contato</h3>

        <div className="grid gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputStyle("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            maxLength={15}
            className={inputStyle("telefone")}
          />
          {errors.telefone && (
            <p className="text-red-500 text-xs">{errors.telefone}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-300 hover:bg-blue-800 text-white py-3 rounded-xl"
        >
          {form.id ? "Atualizar" : "Salvar"}
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="flex-1 bg-gray-300 hover:bg-gray-800 py-3 rounded-xl"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
