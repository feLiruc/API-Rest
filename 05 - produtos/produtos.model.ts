import * as mongoose from 'mongoose'

export interface Produto extends mongoose.Document {
	Servidor: string,
	ProdutoDescricao: string,
	FamiliaDescricao: string,
	ProdutoCodigo: string
}

const produtoSchema = new mongoose.Schema({
	Servidor: {
		type: String
	},
	ProdutoDescricao: {
		type: String
	},
	FamiliaDescricao: {
		type: String
	},
	ProdutoCodigo: {
		type: String
	}
})

export const Produto = mongoose.model<Produto>('Produto', produtoSchema)