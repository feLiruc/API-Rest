import * as mongoose from 'mongoose'

export interface Vendedor extends mongoose.Document {
	Servidor: string,
	VendedorCodigo: number,
	VendedorDescricao: string
}

const vendedorSchema = new mongoose.Schema({
	VendedorDescricao: {
		type: String
	},
	VendedorCodigo: {
		type: Number
	},
	Servidor: {
		type: String
	}
})

export const Vendedor = mongoose.model<Vendedor>('Vendedor', vendedorSchema, 'vendedores')