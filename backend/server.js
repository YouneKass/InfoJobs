import { createServer } from 'node:http'

const port = 3000

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/palin; charset=utf-8')
  res.end('Hola desde Node! 🎃⭐')
})

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})