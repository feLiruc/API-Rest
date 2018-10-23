import * as jestCli from 'jest-cli'

import { Server } from './server/server'
import { environment } from './common/environment'
import { restaurantRouter } from './80 - restaurants/restaurants.router'
import { Restaurant } from './80 - restaurants/restaurants.model'
import { reviewRouter } from './85 - reviews/reviews.router'
import { Review } from './85 - reviews/reviews.model'
import { usersRouter } from './99 - users/users.router'
import { User } from './99 - users/users.model'

let server: Server

let routes = [usersRouter, reviewRouter, restaurantRouter]

const beforeAllTests = () => {
	environment.db.url = process.env.DB_URL || 'mongodb://localhost/FV-test-db'
	environment.server.port = process.env.SERVER_PORT || 3001
	server = new Server()
	return server.bootstrap(routes)
				 .then(()=>User.remove({}).exec())
				 .then(()=>Review.remove({}).exec())
				 .then(()=>Restaurant.remove({}).exec())
				 .then(()=>{
					 let admin = new User()
					 admin.name = 'admin'
					 admin.email = 'admin@bridsolucoes.com.br'
					 admin.password = '04011991'
					 admin.profiles = ['admin', 'user']
					 return admin.save()
				 })
}

const afterAllTests = () => {
	return server.shutdown()
}

beforeAllTests()
.then(()=>jestCli.run())
.then(()=>afterAllTests())
.catch(console.error)