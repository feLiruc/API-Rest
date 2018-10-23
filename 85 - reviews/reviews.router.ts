import * as mongoose from 'mongoose'
import * as restify from 'restify'
import { ModelRouter } from '../common/model-router'
import { Review } from './reviews.model'
import { NotFoundError } from 'restify-errors'
import { authorize } from '../security/authz.handler'

class ReviewRouter extends ModelRouter<Review> {

	constructor(){
		super(Review)
	}

	envelope(document){
		let resource = super.envelope(document)
		const restID = document.restaurant._id ? document.restaurant._id : document.restaurant
		resource._links.restaurant = `/restaurants/${restID}`
		return resource
	}

	// findById = (req, res, next) => {
	// 	this.model.findById(req.params.id)
	// 		.populate('user', 'name')
	// 		.populate('restaurant', 'name')
	// 		.then(this.render(res, next))
	// 		.catch(next)
	// }

	protected prepareOne(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<Review,Review>{
		return query
		.populate('user', 		'name')
		.populate('restaurant', 'name')
	}

	applyRoutes(application: restify.Server){

		application.get(`${this.basePath}`, this.findAll)

		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])

		application.post(`${this.basePath}`, this.save)

		// application.put('/reviews/:id', [this.validateId, this.replace])

		// application.patch('/reviews/:id', [this.validateId, this.update])

		// application.del('/reviews/:id', [this.validateId, this.delete])

	}
}

export const reviewRouter = new ReviewRouter()