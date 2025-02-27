import { useState } from "react";
import { useRouter } from "next/router";
import { Atividade } from "@/tipos/atividade";
import Image from "next/image";

export default function NovaAtividade() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [erros, setErros] = useState<{ nome?: string; responsavel?: string; data?: string; descricao?: string }>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    let novosErros: typeof erros = {};

    if (!nome) novosErros.nome = "O nome é obrigatório.";
    if (!responsavel) novosErros.responsavel = "O responsável é obrigatório.";
    if (!data) novosErros.data = "A data é obrigatória.";
    if (!descricao) novosErros.descricao = "A descrição é obrigatória.";

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    const novaAtividade: Atividade = {
      id: String(Date.now()),
      nome,
      responsavel,
      data,
      descricao,
    };

    const atividadesSalvas = localStorage.getItem("atividades");
    const listaAtividades: Atividade[] = atividadesSalvas ? JSON.parse(atividadesSalvas) : [];
    listaAtividades.push(novaAtividade);
    localStorage.setItem("atividades", JSON.stringify(listaAtividades));

    setMensagemSucesso("Atividade cadastrada com sucesso!");

    setNome("");
    setResponsavel("");
    setData("");
    setDescricao("");
    setErros({});

    setTimeout(() => {
      setMensagemSucesso("");
      router.push("/");
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-[rgb(245,239,239)] p-6 rounded-lg shadow-lg w-full max-w-lg text-white">
        
        {/* Imagem centralizada */}
        <div className="flex justify-center mb-10">
          <Image src="/Assets/ufc.png" alt="Logo" width={80} height={80} className="object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-black text-center">Cadastrar Nova Atividade</h1>

        {mensagemSucesso && (
          <div className="mt-4 p-3 bg-lime-300 text-black rounded">
            {mensagemSucesso}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nome da atividade"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`w-full p-2 border rounded bg-white text-black placeholder-gray-700 ${
                erros.nome ? "border-red-500" : "border-gray-300"
              }`}
            />
            {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Responsável"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              className={`w-full p-2 border rounded bg-white text-black placeholder-gray-700 ${
                erros.responsavel ? "border-red-500" : "border-gray-300"
              }`}
            />
            {erros.responsavel && <p className="text-red-500 text-sm mt-1">{erros.responsavel}</p>}
          </div>

          <div>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={`w-full p-2 border rounded bg-white text-black placeholder-gray-700 ${
                erros.data ? "border-red-500" : "border-gray-300"
              }`}
            />
            {erros.data && <p className="text-red-500 text-sm mt-1">{erros.data}</p>}
          </div>

          <div>
            <textarea
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={`w-full p-2 border rounded bg-white text-black placeholder-gray-700 ${
                erros.descricao ? "border-red-500" : "border-gray-300"
              }`}
            />
            {erros.descricao && <p className="text-red-500 text-sm mt-1">{erros.descricao}</p>}
          </div>

          <button type="submit" className="w-full p-2 bg-[#d76483] text-black rounded-lg hover:bg-[#ef9ca4]">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
