import { Router } from '../common/router'
import { Safra } from './safras.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class SafrasRouter extends Router {

	applyRoutes(application: restify.Server){

		application.get('/safras', (req, res, next) => {
			Safra.find()
				.then(this.render(res, next))
				.catch(next)
		})

		application.get('/safras/:id', (req, res, next) => {
			Safra.findById(req.params.id)
				.then(this.render(res, next))
				.catch(next)
		})

		application.post('/safras', (req, res, next) => {
			let safra = new Safra(req.body)
			safra.save()
				.then(this.render(res, next))
				.catch(next)
		})

		application.put('/safras/:id', (req, res, next) => {
			const opt = { overwrite: true }
			Safra.update({_id: req.params.id}, req.body, opt)
				.exec().then(result=> {
					if(result.n){
						return Safra.findById(req.params.id)
					}else{
						throw new NotFoundError('Documento não encontrado')
					}
			}).then(this.render(res, next))
			  .catch(next)
		})

		application.patch('/safras/:id', (req, res, next) => {
			const opt = {new: true}
			Safra.findByIdAndUpdate(req.params.id, req.body, opt)
				.then(this.render(res, next))
				.catch(next)
		})

		application.del('/safras/:id', (req, res, next) => {
			Safra.remove({_id: req.params.id}).exec()
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

export const safrasRouter = new SafrasRouter()