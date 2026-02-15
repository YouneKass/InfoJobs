import { useContactForm } from "../hooks/useContactForm"

export function ContactPage() {
  const {
    values,
    errors,
    success,
    loading,
    handleChange,
    handleSubmit
  } = useContactForm();

  return(
    <section>
      <div className="contacTitle">
        <h2>Contacto:</h2>
        <p>¿Tienes Preguntas? Contáctanos.</p>
      </div>

      {success && <p style={{ color: "green" }}>Mensaje enviado correctamente ✅</p>}

      <form role="form" className="contactForm" onSubmit={handleSubmit}>
        <h2>Asunto:</h2>
        <div className="contactInput">
          <input type="text" name="name" placeholder="nombre" value={values.name} onChange={handleChange}/>
          {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        </div>
        <div className="contactInput">
          <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>
        <div>
          <textarea className="contactMotivo" name="message" placeholder="Mensaje" value={values.message} onChange={handleChange}/>
          {errors.message && <small style={{ color: "red" }}>{errors.message}</small>}
        </div>
        <button disabled={loading} className="contactBoton">{loading ? "Enviando..." : "Enviar"}</button>
      </form>
    </section>
  )
}