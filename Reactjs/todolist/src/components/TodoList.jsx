
import { useState } from "react";
import styles from "./TodoList.module.css";

export default function TodoList() {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (e) => {
    e.preventDefault();

    if (novaTarefa.trim() === "") return;

    const nova = {
      id: Date.now(),
      texto: novaTarefa,
      completa: false,
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  };

  const toggleCompleta = (id) => {
    const atualizadas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, completa: !tarefa.completa } : tarefa
    );
    setTarefas(atualizadas);
  };

  const removerTarefa = (id) => {
    const filtradas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(filtradas);
  };

  return (
    <div className={styles.container}>
      <h2>Lista de Tarefas</h2>
      <form onSubmit={adicionarTarefa} className={styles.form}>
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
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
            className={`${styles.item} ${
              tarefa.completa ? styles.completa : ""
            }`}
          >
            <span onClick={() => toggleCompleta(tarefa.id)}>
              {tarefa.texto}
            </span>
            <button onClick={() => removerTarefa(tarefa.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
