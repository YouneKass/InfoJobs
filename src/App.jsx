import { useState } from "react"
import { Footer } from './components/Footer.jsx'
import { Header } from "./components/Header.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { JobsListings } from "./components/JobsListings.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import jobsData from "./data.json";

const RESULTS_PER_PAGE = 5

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)

  const pagedResults = jobsData.slice(
    (currentPage - 1 ) * RESULTS_PER_PAGE, //Pagina 0 -> 0, pagina 1 -> 5, pagian 2 -> 10
    currentPage * RESULTS_PER_PAGE //pagina 1 -> 5, pagina 2 -> 10 ...
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header/>

      <main>
          <SearchFormSection/>

          <section>
              <JobsListings jobs={pagedResults} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </section>
      </main>

      <Footer/>
    </>
  )
}

export default App
