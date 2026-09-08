import { useState,useEffect } from "react"
import '../css/estilo.css'
import { X, Check } from "lucide-react";

const Tarefas = () => {
    //HOOK- useState para armazenar a tarefa
    const [tarefas, setTarefas]=useState(()=>{
    //LOCALSTORAGE
    const salvarTarefa = localStorage.getItem("item-tarefa");
    return salvarTarefa ? JSON.parse(salvarTarefa):[]; 
    });
    //useState para o campo da tarefa
    const [campo, setCampo]=useState("");

    //HOOK useEffect - realiza o efeito colateral, no exemplo
    //ao cadastrar a tarefa aparece automaticamente na tela

    useEffect(()=>{
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    },[tarefas])
   

    //Função Adicionar Tarefa
    const AdicionarTarefa=(e)=>{
      //previne que a pagina se recarregue
        e.preventDefault();
        //valida o campo se for vazio
        if(!campo.trim()) return;

        //objeto criar a tarefa
        const novaTarefa={
          id:Date.now(),
          text:campo,
        };
        setTarefas([...tarefas,novaTarefa])
        setCampo('');
    }
    //FUNÇÃO REMOVER TAREFA
    const RemoverTarefa=(id)=>{
      const apagartarefa =tarefas.filter((tarefa)=>tarefa.id !==id);
      setTarefas(apagartarefa);
    }


  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-200 rounded-2xl p-2.5 shadow-2xl border border-gray-800">
      <h1 className="text-2xl font-bold text-grey-800 mb-6 text-center uppercase">Minha Lista de tarefas</h1>
      <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-6">
        <input
          type="text"
          value={campo}
          onChange={(e)=>{setCampo(e.target.value)}}
          placeholder="Digite uma tarefa"
          className="flex-1 px-4 py-2 border border-grey-800 rounded-xl focus:outline-none focus:ring-2 bg-gray-100 ring-gray-700 focus:bg-white focus:border-transparent text-cyan-gray placeholder:cyan-900"
        />
        <button type="submit" className="bg-gray-400 hover:text-white hover:bg-green-500 font-medium rounded-xl px-2 py-1 transition-colors cursor-pointer hover:font-bold" border>Adicionar</button>
      </form>
      <ul className="space-y-3">
        {tarefas.map((tarefa)=>(
          <li key={tarefa.id} className="flex items-center justify-between p-3 bg-gray-300 rounded-2xl hover:shadow-lg hover:bg-gray-100 hover:-translate-y-1">
              <span className="text-black break-all mr-2">{tarefa.text}</span>
          <button onClick={()=>RemoverTarefa(tarefa.id)} className="bg-gray-400 p-1.5 rounded-xl hover:bg-red-500 hover:font-medium transition-colors hover:text-white">Excluir</button>
          </li>

        ))}
      </ul>
      {/* compara senão tiver tarefas deixar a nenhuma tarefa salva */}
      {tarefas.length === 0 && <p className="text-center text-gray-600 italic mt-4 font-extralight">Nenhuma tarefa salva</p>}
      
    </div>
  )
}

export default Tarefas
