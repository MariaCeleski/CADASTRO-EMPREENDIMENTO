import type { Empreendimento } from "../types/Empreendimento";
import { EmpreendimentoItem } from "./EmpreendimentoItem";

interface Props {
  lista: Empreendimento[];
  onDelete: (id: string) => void;
  onEdit: (emp: Empreendimento) => void;
}

export function EmpreendimentoList({ lista, onDelete, onEdit }: Props) {
  return (
    <div>
      {lista.map((emp) => (
        <EmpreendimentoItem
          key={emp.id}
          emp={emp}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}