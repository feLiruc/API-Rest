import { ModelRouter } from '../common/model-router'
import { Restaurant } from './restaurants.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { authorize } from '../security/authz.handler'

class RestaurantRouter extends ModelRouter<Restaurant> {

	constructor(){
		super(Restaurant)
	}

	envelope(document){
		let resource = super.envelope(document)
		resource._links.menu = `${this.basePath}/${resource._id}/menu`
		return resource
	}

	findMenu = (req, res, next) => {
		Restaurant.findById(req.params.id, "+menu")
			.then(rest => {
				if(!rest){
					throw new NotFoundError("Restaurant not found")
				}else{
					res.json(rest.menu)
					next()
				}
			}).catch(next)
	}

	replaceMenu = (req, res, next) => {
		Restaurant.findById(req.params.id).then( rest => {
			if(!rest){
				throw new NotFoundError("Restaurant not found")
			}else{
				rest.menu = req.body // array menuItem
				return rest.save()
			}
		}).then(rest=>{
			res.json(rest.menu)
			return next
		}).catch(next)
	}

	applyRoutes(application: restify.Server){

		application.get('/restaurants', this.findAll)

		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])

		application.post('/restaurants', [authorize('admin'), this.save])

		application.put(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.replace])

		application.patch(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.update])

		application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.delete])

		application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu])

		application.put(`${this.basePath}/:id/menu`, [authorize('admin'), this.validateId, this.replaceMenu])

	}
}

export const restaurantRouter = new RestaurantRouter()