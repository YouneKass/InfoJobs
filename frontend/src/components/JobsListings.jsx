import { JobCard } from "./JobCard.jsx";

export function JobsListings({jobs}) {
    return(
        <>
            <div className="jobs-listings">
                {
                    jobs.lenght === 0 && (
                        <p style={{ textAlign: 'center', padding: '1rem', textWrap: 'balance' }}>
                            criterios de búsqueda.
                        </p>
                    )
                }
                {jobs.map(job =>(
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </>
    )
}