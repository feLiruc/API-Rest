import { Router } from '../common/router'
import { Produto } from './produtos.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

class ProdutosRouter extends Router {

	applyRoutes(application: restify.Server){

		application.get('/produtos', (req, res, next) => {
			Produto.find()
				.then(this.render(res, next))
				.catch(next)
		})

		application.get('/produtos/:id', (req, res, next) => {
			Produto.findById(req.params.id)
				.then(this.render(res, next))
				.catch(next)
		})

		application.post('/produtos', (req, res, next) => {
			let produto = new Produto(req.body)
			produto.save()
				.then(this.render(res, next))
				.catch(next)
		})

		application.put('/produtos/:id', (req, res, next) => {
			const opt = { overwrite: true }
			Produto.update({_id: req.params.id}, req.body, opt)
				.exec().then(result=> {
					if(result.n){
						return Produto.findById(req.params.id)
					}else{
						throw new NotFoundError('Documento não encontrado')
					}
			}).then(this.render(res, next))
			  .catch(next)
		})

		application.patch('/produtos/:id', (req, res, next) => {
			const opt = {new: true}
			Produto.findByIdAndUpdate(req.params.id, req.body, opt)
				.then(this.render(res, next))
				.catch(next)
		})

		application.del('/produtos/:id', (req, res, next) => {
			Produto.remove({_id: req.params.id}).exec()
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

export const produtosRouter = new ProdutosRouter()