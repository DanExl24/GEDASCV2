import express from 'express'
import http from "http";
import cors from 'cors'

// rutas
import testRoutes from './routes/test.routes'
import QueryId from './routes/QueryId.routes'
import EntryRecord from './routes/entry.routes'
import ExitRecord from './routes/exit.routes'
import HistoryRecord from './routes/history.routes'
import StatsRecord from './routes/stats.routes'

const app = express()
const server = http.createServer(app)



// middlewares
app.use(express.json())
app.use(cors())

// rutas
app.get('/', (req, res) => {
  res.send('Servidor activo')
})

app.use('/api', testRoutes)
app.use('/api/aprendiz', QueryId)
app.use('/api/registroIngresos', EntryRecord)
app.use('/api/registroSalidas', ExitRecord)
app.use('/api/historico', HistoryRecord)
app.use('/api/estadisticas', StatsRecord)

// 🚀 servidor
const PORT = 3000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
