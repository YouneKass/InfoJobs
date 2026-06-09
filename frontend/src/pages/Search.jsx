import { useEffect, useState } from "react"
import { useSearchParams } from "react-router";
import { Pagination } from "../components/Pagination.jsx";
import { JobsListings } from "../components/JobsListings.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";

const RESULTS_PER_PAGE = 4

const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [filters, setFilters] = useState(() => {
        return{
            technology: searchParams.get('technology') || '',
            location: searchParams.get('type') || '',
            experienceLevel: searchParams.get('level') || ''
        }
    })

    const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '')

    const [currentPage, setCurrentPage] = useState(() =>{
        const page = Number(searchParams.get('page'))
        if (Number.isNaN(page) || page < 1) return 1
        return page
    })

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function fetchJobs() {
            try{
                setLoading(true)

                const params = new URLSearchParams()
                if (textToFilter) params.append('text', textToFilter)
                if (filters.technology) params.append('technology', filters.technology)
                if (filters.location) params.append('type', filters.location)
                if (filters.experienceLevel) params.append('level', filters.experienceLevel)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)

                const queryParams = params.toString()
                
                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)
            }catch(error){
                console.error('Error fetching jobs:', error)
            }finally{
                setLoading(false)
            }
        }

        fetchJobs()
    }, [filters, currentPage, textToFilter])

    useEffect(() => {
        setSearchParams((params) =>{
            if (textToFilter) params.set('text', textToFilter)
                else params.delete('text')
            if (filters.technology) params.set('technology', filters.technology)
                else params.delete('technology')
            if (filters.location) params.set('type', filters.location)
                else params.delete('type')
            if (filters.experienceLevel) params.set('level', filters.experienceLevel)
                else params.delete('level')

            if (currentPage > 1) params.set('page', currentPage)
                else params.delete('page')

            return params
        })

    }, [filters, currentPage, textToFilter, setSearchParams])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

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

    return {
        loading,
        jobs,
        total,
        totalPages,
        currentPage,
        textToFilter,
        filters,
        handlePageChange,
        handleSearch,
        handleTextFilter
    }
}

export default function SearchPage() {
    const {
        jobs,
        total,
        loading,
        totalPages,
        currentPage,
        textToFilter,
        filters,
        handlePageChange,
        handleSearch,
        handleTextFilter
    } = useFilters()

    const title = loading ? `Cargando... - DevJobs` : `Resultados: ${total}, Página ${currentPage} - DevJobs`

    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <main>
            <SearchFormSection initialFilters={filters} initialText={textToFilter} onSearch={handleSearch} onTextFilter={handleTextFilter}/>

            <section>
                <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
                {
                    loading ? <p>Cargando empleos...</p> : <JobsListings jobs={jobs} />
                }
                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                )}
            </section>
        </main>
    )
}
