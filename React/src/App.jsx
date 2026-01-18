import Footer from "./components/Footer"
import Header from "./components/Header"
import JobCard from "./components/JobCard"
import Pagination from "./components/Pagination"
import JobsListings from "./components/JobsListings"
import SearchFormSection from "./components/SearchFormSection"


function App() {
  return (
    <>
    <Header/>

    <main>
        <SearchFormSection/>

        <section>
            <JobsListings/>
            <Pagination/>
        </section>
    </main>

    <Footer/>
    </>
  )
}

export default App
