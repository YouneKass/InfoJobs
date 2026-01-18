function JobCard({ job }) {
  // extraemos las propiedades del objeto job
    const { title, company, location, salary, description, tags } = job

    return (
        <article className="job-card">
            <header className="job-card-header">
                <h3 className="job-title">{title}</h3>
                <p className="job-company">{company}</p>
            </header>
            <div className="job-card-body">
                <p className="job-location">{location}</p>
                <p className="job-salary">{salary}</p>
                <p className="job-description">{description}</p>
            </div>
            <footer className="job-card-footer">
                <span className="job-tags">{tags.join(', ')}</span>
                <button className="btn-apply">Aplicar</button>
            </footer>
        </article>
    )
}

export default JobCard