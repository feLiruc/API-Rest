import { ModelRouter } from '../common/model-router'
import { Filial } from './filiais.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class FiliaisRouter extends ModelRouter<Filial> {

	constructor(){
		super(Filial)
	}

	applyRoutes(application: restify.Server){

		application.get('/filiais', this.findAll)

		application.get('/filiais/:id', [this.validateId, this.findById])

		application.post('/filiais', this.save)

		application.put('/filiais/:id', [this.validateId, this.replace])

		application.patch('/filiais/:id', [this.validateId, this.update])

		application.del('/filiais/:id', [this.validateId, this.delete])

	}
}

export const filiaisRouter = new FiliaisRouter()