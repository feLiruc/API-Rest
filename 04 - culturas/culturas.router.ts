import { Router } from '../common/router'
import { Cultura } from './culturas.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class CulturasRouter extends Router {

	applyRoutes(application: restify.Server){

		application.get('/culturas', (req, res, next) => {
			Cultura.find()
				.then(this.render(res, next))
				.catch(next)
		})

		application.get('/culturas/:id', (req, res, next) => {
			Cultura.findById(req.params.id)
				.then(this.render(res, next))
				.catch(next)
		})

		application.post('/culturas', (req, res, next) => {
			let cultura = new Cultura(req.body)
			cultura.save()
				.then(this.render(res, next))
				.catch(next)
		})

		application.put('/culturas/:id', (req, res, next) => {
			const opt = { overwrite: true }
			Cultura.update({_id: req.params.id}, req.body, opt)
				.exec().then(result=> {
					if(result.n){
						return Cultura.findById(req.params.id)
					}else{
						throw new NotFoundError('Documento não encontrado')
					}
			}).then(this.render(res, next))
			  .catch(next)
		})

		application.patch('/culturas/:id', (req, res, next) => {
			const opt = {new: true}
			Cultura.findByIdAndUpdate(req.params.id, req.body, opt)
				.then(this.render(res, next))
				.catch(next)
		})

		application.del('/culturas/:id', (req, res, next) => {
			Cultura.remove({_id: req.params.id}).exec()
				.then((cmdResult: any) => {
					if(cmdResult.result.n){
						res.send(204)
					}else{
						throw new NotFoundError('Documento não encontrado')
					}
					return next()
				})
				.catch(next)
		})

	}
}

export const culturasRouter = new CulturasRouter()