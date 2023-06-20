import 'express-async-errors'
import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'
import app from './routes'
import * as path from 'path'

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
  })
  

AppDataSource.initialize().then(() => {
	// Instância do express
	const app = express()

	// Frontend routes
	app.use(express.static(path.join(__dirname, '../../', 'frontend')))

	// Tipo de dado que vamos usar
	app.use(express.json())

	// Pega todas as nossas rotas
	app.use(routes)

	// Tratamento de erros
	app.use(errorMiddleware)
 
	return app.listen(process.env.PORT, () => console.log(`RUNNING IN PORT ${process.env.PORT}`))
})
