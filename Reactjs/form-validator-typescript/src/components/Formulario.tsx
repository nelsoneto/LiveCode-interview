import { useState, type FormEvent, type ChangeEvent } from "react";
import styles from "./Formulario.module.css";

type FormularioData = {
  nome: string;
  email: string;
};

type Erros = {
  nome?: string;
  email?: string;
};

export default function Formulario() {
  const [formData, setFormData] = useState<FormularioData>({
    nome: "",
    email: "",
  });

  const [erros, setErros] = useState<Erros>({});
  const [sucesso, setSucesso] = useState<string>("");

  const validar = (): Erros => {
    const novosErros: Erros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = "O nome é obrigatório.";
    }

    if (!formData.email.trim()) {
      novosErros.email = "O e-mail é obrigatório.";
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.email)) {
      novosErros.email = "E-mail inválido.";
    }

    return novosErros;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errosValidacao = validar();

    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      setSucesso("");
    } else {
      setErros({});
      setSucesso("Formulário enviado com sucesso!");
      setFormData({ nome: "", email: "" });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErros({ ...erros, [e.target.name]: "" }); // Limpa erro do campo ao digitar
  };

  return (
    <div className={styles.container}>
      <h2>Validador de Formulário</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.campo}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          {erros.nome && <p className={styles.erro}>{erros.nome}</p>}
        </div>

        <div className={styles.campo}>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {erros.email && <p className={styles.erro}>{erros.email}</p>}
        </div>

        <button type="submit">Enviar</button>
      </form>

      {sucesso && <p className={styles.sucesso}>{sucesso}</p>}
    </div>
  );
}
