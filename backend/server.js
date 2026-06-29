import { createServer } from 'node:http'

process.loadEnvFile()

const port = process.env.PORT ?? 3000

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/palin; charset=utf-8')
  res.end('Hola desde Node! 🎃⭐')
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})