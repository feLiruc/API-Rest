import { Server } 			from 	'./server/server'
import { usersRouter } 		from 	'./99 - users/users.router'
import { filiaisRouter } 	from	'./01 - filiais/filiais.router'
import { niveisRouter } 	from	'./02 - niveis/niveis.router'
import { safrasRouter } 	from	'./03 - safras/safras.router'
import { culturasRouter } 	from	'./04 - culturas/culturas.router'
import { produtosRouter } 	from	'./05 - produtos/produtos.router'
import { clientesRouter } 	from	'./06 - clientes/clientes.router'
import { vendedoresRouter } from 	'./07 - vendedores/vendedores.router'

import { restaurantRouter } from 	'./80 - restaurants/restaurants.router'
import { reviewRouter } 	from 	'./85 - reviews/reviews.router'

let rotas = [
				usersRouter,
				filiaisRouter,
				niveisRouter,
				safrasRouter,
				culturasRouter,
				produtosRouter,
				clientesRouter,
				vendedoresRouter,
				restaurantRouter,
				reviewRouter
			]

const server = new Server()
server.bootstrap(rotas).then(server=>{
	console.log("Server is listening on: ", server.application.address())
}).catch(error=>{
	console.log("Server failed to start")
	console.error(error)
	process.exit(1)
})