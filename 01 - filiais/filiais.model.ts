import * as mongoose from 'mongoose'

export interface Filial extends mongoose.Document {
	FilialDescricao: string,
	FilialCodigo: string,
	Servidor: string
}

const filialSchema = new mongoose.Schema({
	FilialDescricao: {
		type: String
	},
	FilialCodigo: {
		type: String
	},
	Servidor: {
		type: String
	}
})

export const Filial = mongoose.model<Filial>('Filial', filialSchema, 'filiais')