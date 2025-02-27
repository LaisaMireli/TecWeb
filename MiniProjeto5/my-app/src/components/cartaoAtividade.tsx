import { Atividade } from "@/tipos/atividade";
import Link from "next/link";

interface Props {
  atividade: Atividade;
}

export default function CartaoAtividade({ atividade }: Props) {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-xl font-bold">{atividade.nome}</h2>
      <p><strong>Responsável:</strong> {atividade.responsavel}</p>
      <p><strong>Data:</strong> {atividade.data}</p>
      <Link href={`/atividade/${atividade.id}`} className="text-blue-600">
        Ver Detalhes
      </Link>
    </div>
  );
}
