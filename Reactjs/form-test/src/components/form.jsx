import React, { useState } from 'react'
import styles from "./form.module.css"

export default function FormValidate() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const handleSubimt = (e) => {
    e.preventDefault()

    if(!name || !email ){
      setMessage("Preencher todos os campos!")
      setError(true);
    }else {
      setMessage("Formulário enviado com sucesso!")
      setError(false)
      setName("")
      setEmail("")
    }
  }

  return (
    <div className={styles.container}>
      <h2>Formulário</h2>
      <form onSubmit={handleSubimt} className={styles.form}>
        <input 
          type="text"
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input 
          type="email"
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} type="submit">
          Enviar
        </button>
      {message && (
        <p className={error ? styles.error : styles.success }>
          {message}
        </p>
      )}
      </form>
    </div>
  )
}
