import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from 'node:stream/consumers'

process.loadEnvFile()

const port = process.env.PORT ?? 3000

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

const users = [
  { id: 1, name: 'Felipe' },
  { id: 2, name: 'Tania' },
]

const server = createServer(async (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/users') {
      return sendJson(res, 200, users)
    } 

    if (url === '/health') {
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
    } 
  }

  if (method === 'POST') {
    if (url === '/users') {
        const body = await json(req)
        
        if (!body || !body.name) {
          return sendJson(res, 400, { error: 'Name is required' })
        }

        const newUser = {
          name: body.name,
          id: randomUUID(),
        }

        return sendJson(res, 201, { mesage: 'Usuario creado' })
    }
  }

  return sendJson(res, 404, {error: 'Not Found' })
})

server.listen(port, () => {
  const address = server.address()
  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})