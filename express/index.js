import express from 'express'
import jobs from './jobs.json' with { type: 'json' } 

const PORT = process.env.PORT ?? 1234
const app = express()

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString()
  console.log(`[${timeString}] ${req.method} ${req.url}`)  
  next()
})

app.get('/', (req, res) => {
  return res.send({ message: 'Hello world' })
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

app.get('/get-jobs', (req, res) => {
  const { text, title, level, limit, technology, offset } = req.query

  let filteredJobs = jobs

  if (text) {
    const searchTerm = text.toLowerCase()
    filteredJobs = filteredJobs.filter(job => 
      job.titulo.toLowerCase().includes(searchTerm) || job.description.toLowerCase().includes(searchTerm)
    )
  }

  if (technology) {
    filteredJobs = filteredJobs.filter(job =>
      job.tecnologias.includes(technology)
    )
  }

  return res.json(fileredJobs)
})

app.get('/get-single-job/:id', (req, res) => {
  const { id } = req.params

  const idNumber = Number(id)

  return res.json({
    job: { id: idNumber, title: `Job with id ${id}` }
  })
})

//Opcional -> /acd o /abcd
app.get('/a{b}cd', (req, res) => {
  return res.send('abcd o acd')
})

//comodín
app.get('/bb*bb', (req, res) => {
  return res.send('bb*bb')
})

//Rutas más largas que no sabes como terminan
app.get('/file/*filename', (req, res) => {
  return res.send('file/*')
})

//Usar Regex -> no recomendado
app.get(/.*fly$/, (req, res) => {
  return res.send('Terminan con fly')
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})