import { useId, useState, useRef } from "react"

const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter }) => {

    const timeoutId = useRef(null)
    const [searchText, setSearchText] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        if (event.target.name === idText) {
            return
        }

        const filters = {
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experienceLevel: formData.get(idExperienceLevel)
        }

        onSearch(filters)
    }

    const handleTextChange = (event) => {
        const text = event.target.value
        setSearchText(text) // actualizamos el input inmediatamente

        //DEBOUNCE: Cancelar el timeout anterior
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }
        timeoutId.current = setTimeout(() => {
            onTextFilter(text)
        }, 500)
        
    }

    return {
        searchText,
        handleSubmit,
        handleTextChange
    }
}

export function SearchFormSection({ onTextFilter, onSearch, initialText, initialFilters }) {
    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()
    const inputRef = useRef()

    const { 
        handleSubmit, 
        handleTextChange 
    } = useSearchForm({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter })

    const handleClearInput = (event) => {
        event.preventDefault()
        inputRef.current.value = ""
        onTextFilter("")
    }

    return (
        <section className="jobs-search">
            <h1>Encuentra tu próximo trabajo</h1>
            <p>Explora miles de oportunidades en el sector tecnológico.</p>

            <form onChange={handleSubmit} id="empleos-search-form" role="search" >

                <div className="search-bar">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  
                    strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" 
                    d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    
                    <input ref={inputRef} name={idText} id="empleos-search-input"  type="text" 
                    placeholder="Buscar trabajos, empresas o habilidades" onChange={handleTextChange} defaultValue={initialText}/>
                    
                    <button onClick={handleClearInput}>x</button>
                </div>

                <div className="search-filters">
                    <select name={idTechnology} id="filter-technology" defaultValue={initialFilters?.technology || ''}>
                        <option value="">Tecnologia</option>
                        <optgroup label="Tecnologías populares">
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="React">React</option>
                            <option value="Node.js">Node.js</option>
                        </optgroup>
                        <hr/>
                        <option value="Java">Java</option>
                        <option value="C#">C#</option>
                        <option value="C">C</option>
                        <option value="C++">C++</option>
                        <option value="PHP">PHP</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Mobile">Mobile</option>
                    </select>
                    <select name={idLocation} id="filter-location" defaultValue={initialFilters?.location || ''}>
                        <option value="">Ubicación</option>
                        <option value="Remoto">Remoto</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Chile">Chile</option>
                        <option value="Espana">España</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="cdmx">Ciudad de México</option>
                    </select>
                    <select name={idExperienceLevel} id="filter-experience-level" defaultValue={initialFilters?.experienceLevel || ''}>
                    <option value="">Nivel de experiencia</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    </select>
                </div>
            </form>

            <span id="filter-selected-value"></span>
        </section>
    )
}