import { ModelRouter } from '../common/model-router'
import { User } from './users.model'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { authenticate } from '../security/auth.handler'
import { authorize } from '../security/authz.handler'

class UsersRouter extends ModelRouter<User> {

	constructor(){
		super(User)
		this.on('beforeRender', document => {
			document.password = undefined
		})
	}

	findByEmail = (req, res, next) => {
		if(req.query.email){
			User.findByEmail(req.query.email)
				.then(user => user ? [user] : [])
				.then(this.renderAll(res, next, {
					pageSize: this.pageSize,
					url: req.url
				}))
				.catch(next)
		}else{
			next()
		}
		
	}

	//5bc5e6c4acb6744728f614d6

	//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmaW0xOTkxQGhvdG1haWwuY29tIiwiaXNzIjoibWVhdC1hcGkiLCJpYXQiOjE1Mzk4NzM4ODB9.rL0HoMfkpILd7gyMTOFmEPxmBtyWpBfNjsHJTTqTLbc

	applyRoutes(application: restify.Server){

		application.get({path:`${this.basePath}`,version:'2.0.0'}, [
			authorize('admin'),
			this.findByEmail,
			this.findAll
		])
		application.get({path:`${this.basePath}`,version:'1.0.0'}, [authorize('admin'), this.findAll])

		application.get(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.findById])

		application.post(`${this.basePath}`, [authorize('admin'), this.save])

		application.put(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.replace])

		application.patch(`${this.basePath}/:id`, [this.validateId, this.update])

		application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.delete])

		application.post(`${this.basePath}/authenticate`, authenticate)

	}
}

export const usersRouter = new UsersRouter()