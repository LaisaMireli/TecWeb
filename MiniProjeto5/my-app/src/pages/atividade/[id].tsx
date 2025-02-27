import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Atividade } from "@/tipos/atividade";
import Image from "next/image";

export default function DetalhesAtividade() {
  const router = useRouter();
  const { id } = router.query;
  const [atividade, setAtividade] = useState<Atividade | null>(null);

  useEffect(() => {
    if (id) {
      const atividadesSalvas = localStorage.getItem("atividades");
      if (atividadesSalvas) {
        const listaAtividades: Atividade[] = JSON.parse(atividadesSalvas);
        const atividadeEncontrada = listaAtividades.find((a) => a.id === id);
        if (atividadeEncontrada) {
          setAtividade(atividadeEncontrada);
        }
      }
    }
  }, [id]);

  if (!atividade) {
    return <p className="p-8 text-center text-red-600">Erro: Atividade não encontrada.</p>;
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
      <div className="bg-[rgb(245,239,239)] p-6 rounded-lg shadow-lg w-full max-w-lg">
        
        <div className="flex justify-center mb-10">
          <Image src="/Assets/ufc.png" alt="Logo" width={80} height={80} className="object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-black">{atividade.nome}</h1>

        <p className="text-[#d76483] font-semibold">Responsável:</p>
        <p className="text-[#27187D]">{atividade.responsavel}</p>

        <p className="text-[#d76483] font-semibold">Data:</p>
        <p className="text-[#27187D]">{atividade.data}</p>

        <p className="text-[#d76483] font-semibold">Descrição:</p>
        <p className="text-[#27187D]">{atividade.descricao}</p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-[#d76483] text-white px-4 py-2 rounded-lg hover:bg-[#ef9ca4] transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
