import express from 'express'

const PORT = process.env.PORT ?? 1234
const app = express()

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