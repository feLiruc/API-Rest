import * as mongoose from 'mongoose'

export interface Safra extends mongoose.Document {
	SafraDescricao: string
}

const safraSchema = new mongoose.Schema({
	SafraDescricao: {
		type: String
	}
})

export const Safra = mongoose.model<Safra>('Safra', safraSchema)