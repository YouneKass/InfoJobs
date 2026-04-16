import { useState, useEffect, Children, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { Link } from "../components/Link"
import snarkdown from "snarkdown"
import styles from "./Detail.module.css"
import { AuthContext } from "../context/AuthContext"

function JobSection({ title, content }) {
  const html = snarkdown(content)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>

      <div className={`${styles.sectionContent} prose`} dangerouslySetInnerHTML={{
        __html: html
      }} />
    </section>
  )
}

function DetailPageBreadCrumb({ job }) {
  return (
    <div className={styles.container}>
        <nav aria-label='Ruta de navegación' className={styles.breadcrumb}>
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href='/search' className={styles.breadcrumbLink}>
                Empleos
              </Link>
            </li>
            <li aria-current='page' className={styles.breadcrumbCurrent}>
              {job.titulo}
            </li>
          </ol>
        </nav>
      </div>
  )
}

function DetailPageHeader({ job }) {
  return(
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {job.titulo}
        </h1>
        <p className={styles.meta}>
          {job.empresa} · {job.ubicacion} · {job.data.nivel}
        </p>
      </header>

      <DetailApplyButton />
    </>
  )
}

function DetailApplyButton() {
  const { isLoggedIn } = useContext(AuthContext)
  return(
    <aside className={styles.sidebar}>
      <button disabled={!isLoggedIn} className={styles.applyButton} >
        {isLoggedIn ? "Aplicar ahora" : "Iniciar sesión para aplicar"}
      </button>
    </aside>
  )
}

export default function JobDetail() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then(response => {
        if (!response.ok) {
          navigate('/not-found')
        }
          return response.json()
      })
      .then(json => {
        setJob(json)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [jobId])

  if (loading){
    return <div className={styles.page}>
      <div className={styles.loading}>
        <p className={styles.loadingText}>Cargando...</p>
      </div>
    </div>
  }


    if (error || !job) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>
            Oferta no encontrada
          </h2>
          <button
            onClick={() => navigate('/')}
            className={styles.errorButton}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <DetailPageBreadCrumb job={job} />
      <DetailPageHeader job={job} />  
      

      <div className={styles.layout}>
        <main>
          <JobSection title="Descripción del puesto" content={job.content.description} />
          <JobSection title="Responsabilidades" content={job.content.responsibilities} />
          <JobSection title="Requisitos" content={job.content.requirements} />
          <JobSection title="Acerca de la empresa" content={job.content.about} />
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            {job.data.technology && <p>🤖 {job.data.technology.join(', ')}</p>}
            {job.data.modalidad && <p>🏠 {job.data.modalidad}</p>}
            {job.data.nivel && <p>🧑‍💻 {job.data.nivel}</p>}
          </div>
        </aside>
      </div>
      
    </div>
  )
}