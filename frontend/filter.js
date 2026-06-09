const filterLocation = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')
const filterLevel = document.querySelector('#filter-experience-level')
const filterTechnology = document.querySelector('#filter-technology')
const searchInput = document.querySelector('#empleos-search-input')

//para el uso de acentos dentro de la parte de busqueda sin afectar el filtro

function normalize(str){
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

function applyFilters() {
    const jobs = document.querySelectorAll('.job-listing-card')

    const selectedLocation = filterLocation.value
    const selectedLevel = filterLevel.value
    const selectedTech = filterTechnology.value
    const query = normalize(searchInput.value)

    // if (selectedLocation || selectedLevel || query){
    //     mensaje.textContent = `Filtros activos → Ubicación: ${selectedLocation || 'Todos'} | Nivel: ${selectedLevel || 'Todos'} | Búsqueda: ${query || '—'}`
    // } else {
    //     mensaje.textContent = ''
    // }

    jobs.forEach(job => {

        const modalidad = job.getAttribute('data-modalidad')
        const nivel = job.getAttribute('data-nivel')

        const techList = job.getAttribute('data-technology') || ""

    // convertir string → array normalizado
    const technologies = techList
        .split(',')
        .map(t => normalize(t))
    
        const content = normalize(job.textContent)

        let isShown = true

        if (selectedLocation !== '') {
            isShown = isShown && (modalidad === selectedLocation)
        }

        if (selectedLevel !== '') {
            isShown = isShown && (nivel === selectedLevel)
        }

        if (selectedTech !== '') {
            const techNormalized = normalize(selectedTech)

            const matchesTech = technologies.some(t =>
                t.includes(techNormalized) || techNormalized.includes(t)
            )

            isShown = isShown && matchesTech
        }

        if (query !== '') {
            isShown = isShown && content.includes(query)
        }

        job.classList.toggle('is-hidden', !isShown)
    })
}

filterLocation.addEventListener('change', applyFilters)
filterLevel.addEventListener('change', applyFilters)
filterTechnology.addEventListener('change', applyFilters)
searchInput.addEventListener('input', applyFilters)