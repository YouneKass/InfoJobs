import express from 'express'

const PORT = process.env.PORT ?? 1234
const app = express()

app.use((request, response, next) => {
  const timeString = new Date().toLocaleTimeString()
  console.log(`[${timeString}] ${request.method} ${request.url}`)  
  next()
})

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/health', (request, response) => {
  response.json({
    status: 'ok',
    uptime: process.uptime()
  })
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})