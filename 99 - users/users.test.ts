import 'jest'
import * as request from 'supertest'
import { Server } from '../server/server'
import { environment } from '../common/environment'
import { usersRouter } from './users.router'
import { User } from './users.model'

let address: string = (<any>global).address
let auth: string = (<any>global).auth

test('get /users', () => {
	return request(address)
		.get('/users')
		.set('Authorization', auth)
		.then(response => {
			expect(response.status).toBe(200)
			expect(typeof response.body.items).toBe("object")
		}).catch(fail)
})

test('post /users', () => {
	return request(address)
		.post('/users')
		.set('Authorization', auth)
		.send({
			name: 'usuario1',
			email: 'usuario1@email.com',
			password: '123456789',
			cpf: '07362193904'
		})
		.then(response => {
			expect(response.status).toBe(200)
			expect(response.body._id).toBeDefined()
			expect(response.body.name).toBe('usuario1')
			expect(response.body.email).toBe('usuario1@email.com')
			expect(response.body.password).toBeUndefined()
			expect(response.body.cpf).toBe('07362193904')
		}).catch(fail)
})

test('get /users/aaaaaa - not found', () => {
	return request(address)
		.get('/users/aaaaaa')
		.set('Authorization', auth)
		.then(response => {
			expect(response.status).toBe(404)
		}).catch(fail)
})

test('patch /users/:id', () => {
	return request(address)
		.post('/users')
		.set('Authorization', auth)
		.send({
			name: 'usuario2',
			email: 'usuario2@email.com',
			password: '123456789'
		})
		.then(response => request(address)
						  .patch(`/users/${response.body._id}`)
						  .set('Authorization', auth)
						  .send({name: 'usuario2 - patch'})
						  .catch(fail))
		.then(response => {
			expect(response.status).toBe(200)
			expect(response.body._id).toBeDefined()
			expect(response.body.name).toBe('usuario2 - patch')
			expect(response.body.email).toBe('usuario2@email.com')
			expect(response.body.password).toBeUndefined()
		})
		.catch(fail)
})