import * as mongoose from 'mongoose'

export interface Cultura extends mongoose.Document {
	CulturaDescricao: string,
	CulturaCodigo: number,
	Depara: string
}

const culturaSchema = new mongoose.Schema({
	CulturaDescricao: {
		type: String
	},
	CulturaCodigo: {
		type: Number
	},
	Depara: {
		type: String
	}
})

export const Cultura = mongoose.model<Cultura>('Cultura', culturaSchema)