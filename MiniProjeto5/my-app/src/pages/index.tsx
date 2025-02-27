import Link from "next/link";
import { useEffect, useState } from "react";
import { Atividade } from "@/tipos/atividade";

export default function Home() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    const atividadesSalvas = localStorage.getItem("atividades");
    if (atividadesSalvas) {
      setAtividades(JSON.parse(atividadesSalvas));
    }
  }, []);

  function excluirAtividade(id: string) {
    const novasAtividades = atividades.filter((atividade) => atividade.id !== id);
    setAtividades(novasAtividades);
    localStorage.setItem("atividades", JSON.stringify(novasAtividades));
  }

  function confirmarLimparTodasAtividades() {
    setMostrarConfirmacao(true);
  }

  function limparTodasAtividades() {
    setAtividades([]);
    localStorage.removeItem("atividades");
    setMostrarConfirmacao(false);
  }

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-[rgb(245,239,239)] p-6 rounded-lg shadow-lg text-white relative">
        
        {/* Imagem no topo */}
        <div className="flex justify-center mb-10">
          <img src="/Assets/ufc.png" alt="Logo" className="w-32 h-32 object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-black text-center">Lista de Atividades</h1>

        <div className="flex justify-between mt-4">
          <Link href="/nova-atividade">
            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition">
              Nova Atividade
            </button>
          </Link>

          {atividades.length > 0 && (
            <button
              onClick={confirmarLimparTodasAtividades}
              className="bg-[#d76483] text-white px-4 py-2 rounded-lg hover:bg-[#ef9ca4] transition"
            >
              Limpar Tudo
            </button>
          )}
        </div>

        <ul className="mt-6 space-y-4">
          {atividades.map((atividade) => (
            <li key={atividade.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center text-black">
              <Link href={`/atividade/${atividade.id}`} className="font-semibold flex-1">
                {atividade.nome}
              </Link>
              <button
                onClick={() => excluirAtividade(atividade.id)}
                className="ml-4 bg-[#d76483] text-white px-3 py-1 rounded-lg hover:bg-[#ef9ca4] transition"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Confirmação */}
      {mostrarConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold text-black mb-4">Tem certeza que deseja excluir todas as atividades?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={limparTodasAtividades}
                className="bg-[#d76483] text-white px-4 py-2 rounded-lg hover:bg-[#ef9ca4] transition"
              >
                Sim, excluir
              </button>
              <button
                onClick={() => setMostrarConfirmacao(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
