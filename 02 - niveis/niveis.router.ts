import { Router } from '../common/router'
import { Nivel } from './niveis.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class NiveisRouter extends Router {

	applyRoutes(application: restify.Server){

		application.get('/niveis', (req, res, next) => {
			Nivel.find()
				.then(this.render(res, next))
				.catch(next)
		})

		application.get('/niveis/:id', (req, res, next) => {
			Nivel.findById(req.params.id)
				.then(this.render(res, next))
				.catch(next)
		})

		application.post('/niveis', (req, res, next) => {
			let nivel = new Nivel(req.body)
			nivel.save()
				.then(this.render(res, next))
				.catch(next)
		})

		application.put('/niveis/:id', (req, res, next) => {
			const opt = { overwrite: true }
			Nivel.update({_id: req.params.id}, req.body, opt)
				.exec().then(result=> {
					if(result.n){
						return Nivel.findById(req.params.id)
					}else{
						throw new NotFoundError('Documento não encontrado')
					}
			}).then(this.render(res, next))
			  .catch(next)
		})

		application.patch('/niveis/:id', (req, res, next) => {
			const opt = {new: true}
			Nivel.findByIdAndUpdate(req.params.id, req.body, opt)
				.then(this.render(res, next))
				.catch(next)
		})

		application.del('/niveis/:id', (req, res, next) => {
			Nivel.remove({_id: req.params.id}).exec()
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

export const niveisRouter = new NiveisRouter()