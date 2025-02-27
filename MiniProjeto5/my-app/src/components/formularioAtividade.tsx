import { useState } from "react";
import { Atividade } from "@/tipos/atividade";
import { useRouter } from "next/router";

export default function FormularioAtividade() {
  const router = useRouter();
  const [atividade, setAtividade] = useState<Atividade>({
    id: "",
    nome: "",
    responsavel: "",
    data: "",
    descricao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAtividade({ ...atividade, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!atividade.nome || !atividade.responsavel || !atividade.data || !atividade.descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    const atividadesSalvas = localStorage.getItem("atividades");
    const listaAtividades: Atividade[] = atividadesSalvas ? JSON.parse(atividadesSalvas) : [];

    atividade.id = String(new Date().getTime()); 
    listaAtividades.push(atividade);
    localStorage.setItem("atividades", JSON.stringify(listaAtividades));

    alert("Atividade cadastrada com sucesso!");
    router.push("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Nova Atividade</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="text" name="nome" placeholder="Nome da Atividade" value={atividade.nome} onChange={handleChange} className="mb-3 p-2 border rounded" />
        <input type="text" name="responsavel" placeholder="Responsável" value={atividade.responsavel} onChange={handleChange} className="mb-3 p-2 border rounded" />
        <input type="date" name="data" value={atividade.data} onChange={handleChange} className="mb-3 p-2 border rounded" />
        <textarea name="descricao" placeholder="Descrição" value={atividade.descricao} onChange={handleChange} className="mb-3 p-2 border rounded"></textarea>
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">Cadastrar</button>
      </form>
    </div>
  );
}
