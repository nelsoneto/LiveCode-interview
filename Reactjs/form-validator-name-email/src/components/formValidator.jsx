import { useState } from "react";
import styles from "./formValidator.module.css";

export default function FormValidator() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email) {
      setMensagem("Preencha todos os campos.");
      setErro(true);
    } else {
      setMensagem("Formulário enviado com sucesso!");
      setErro(false);
      setNome("");
      setEmail("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Formulário</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.botao}>
          Enviar
        </button>
        {mensagem && (
          <p
            className={erro ? styles.erro : styles.sucesso}
          >
            {mensagem}
          </p>
        )}
      </form>
    </div>
  );
}
