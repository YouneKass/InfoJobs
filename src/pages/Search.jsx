import { useState } from "react"

import { Pagination } from "../components/Pagination.jsx";
import { JobsListings } from "../components/JobsListings.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import jobsData from "../data.json";

const RESULTS_PER_PAGE = 4

export function SearchPage() {
    const [filters, setFilters] = useState({
                technology: '',
                location: '',
                experienceLevel: ''
            })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const jobsFilterdByFilters = jobsData.filter(job => {
        return(
        (filters.technology === '' || job.data.technology === filters.technology) 
        )
    })

    const jobsWithTextFilter = textToFilter === ''
        ? jobsFilterdByFilters
        : jobsFilterdByFilters.filter(job => {
        return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
        })

        const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

    const pagedResults = jobsWithTextFilter.slice(
        (currentPage - 1 ) * RESULTS_PER_PAGE, //Pagina 0 -> 0, pagina 1 -> 5, pagian 2 -> 10
        currentPage * RESULTS_PER_PAGE //pagina 1 -> 5, pagina 2 -> 10 ...
    )

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    return (
        <main>
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>

            <section>
                <JobsListings jobs={pagedResults} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
        </main>

    )
}

export default SearchPage
