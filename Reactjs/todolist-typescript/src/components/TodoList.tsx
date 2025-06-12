import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import styles from "./TodoList.module.css";

type Tarefa = {
  id: number;
  texto: string;
  completa: boolean;
};

export default function TodoList() {
  const [novaTarefa, setNovaTarefa] = useState<string>("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const adicionarTarefa = (e: FormEvent) => {
    e.preventDefault();
    if (novaTarefa.trim() === "") return;

    const nova: Tarefa = {
      id: Date.now(),
      texto: novaTarefa,
      completa: false,
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  };

  const toggleCompleta = (id: number) => {
    const atualizadas = tarefas.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, completa: !tarefa.completa }
        : tarefa
    );
    setTarefas(atualizadas);
  };

  const removerTarefa = (id: number) => {
    const filtradas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(filtradas);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNovaTarefa(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Lista de Tarefas</h2>
      <form onSubmit={adicionarTarefa} className={styles.form}>
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={novaTarefa}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.botao}>
          Adicionar
        </button>
      </form>

      <ul className={styles.lista}>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={`${styles.item} ${tarefa.completa ? styles.completa : ""
              }`}
          >
            <span onClick={() => toggleCompleta(tarefa.id)}>
              {tarefa.texto}
            </span>
            <button onClick={() => removerTarefa(tarefa.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
