import * as mongoose from 'mongoose'

export interface Nivel extends mongoose.Document {
	NivelTecnologia: string
}

const nivelSchema = new mongoose.Schema({
	NivelTecnologia: {
		type: String
	}
})

export const Nivel = mongoose.model<Nivel>('Nivel', nivelSchema, 'niveis')