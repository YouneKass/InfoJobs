import {mkdir, readFile, writeFile} from 'node:fs/promises'

const content = await readFile('./backend/archivo.txt', 'utf-8')

console.log(content)

const outputDir = 'backend/output/files/documents'
await mkdir(outputDir, { recursive: true })
const uppercaseContent = content.toUpperCase()
await writeFile(`./${outputDir}/archivo.uppercase.txt`, uppercaseContent)
console.log('Archivo creado con contenido en mayúsculas')