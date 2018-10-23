import { Router } from '../common/router'
import { Vendedor } from './vendedores.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class VendedoresRouter extends Router {

	applyRoutes(application: restify.Server){

		application.get('/vendedores', (req, res, next) => {
			Vendedor.find()
				.then(this.render(res, next))
				.catch(next)
		})

		application.get('/vendedores/:id', (req, res, next) => {
			Vendedor.findById(req.params.id)
				.then(this.render(res, next))
				.catch(next)
		})

		application.post('/vendedores', (req, res, next) => {
			let vendedor = new Vendedor(req.body)
			vendedor.save()
				.then(this.render(res, next))
				.catch(next)
		})

		application.put('/vendedores/:id', (req, res, next) => {
			const opt = { overwrite: true }
			Vendedor.update({_id: req.params.id}, req.body, opt)
				.exec().then(result=> {
					if(result.n){
						return Vendedor.findById(req.params.id)
					}else{
						throw new NotFoundError('Documento não encontrado')
					}
			}).then(this.render(res, next))
			  .catch(next)
		})

		application.patch('/vendedores/:id', (req, res, next) => {
			const opt = {new: true}
			Vendedor.findByIdAndUpdate(req.params.id, req.body, opt)
				.then(this.render(res, next))
				.catch(next)
		})

		application.del('/vendedores/:id', (req, res, next) => {
			Vendedor.remove({_id: req.params.id}).exec()
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

export const vendedoresRouter = new VendedoresRouter()