import 'jest'
import * as request from 'supertest'
import { Server } from '../server/server'
import { environment } from '../common/environment'
import { reviewsRouter } from './reviews.router'
import { Review } from './reviews.model'

let address: string = (<any>global).address

test('get /users', () => {
	return request(address)
		.get('/reviews')
		.then(response => {
			expect(response.status).toBe(200)
			expect(typeof response.body.items).toBe("object")
		}).catch(fail)
})