import * as mongoose from 'mongoose'

export interface Cliente extends mongoose.Document {
	ClienteDescricao: string,
	ClienteCodigo: number,
	Servidor: string
}

const clienteSchema = new mongoose.Schema({
	ClienteDescricao: {
		type: String
	},
	ClienteCodigo: {
		type: Number
	},
	Servidor: {
		type: String
	}
})

export const Cliente = mongoose.model<Cliente>('Cliente', clienteSchema)