import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/index';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/files', express.static(uploadConfig.directory));

app.get('/', (request, response) => {
  return response.json({ message: "Hello teste" });
});

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if(err instanceof AppError){
		return response.status(err.statusCode).json({
			stats: 'error',
			message: err.message,
		});
	}

	console.error(err);

	return response.status(500).json({
		status: 'error',
		message: "INternal server error"
	});
});

app.listen(3333, () =>{
  console.log("Server started.");
});

