"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./99 - users/users.router");
const filiais_router_1 = require("./01 - filiais/filiais.router");
const niveis_router_1 = require("./02 - niveis/niveis.router");
const safras_router_1 = require("./03 - safras/safras.router");
const culturas_router_1 = require("./04 - culturas/culturas.router");
const produtos_router_1 = require("./05 - produtos/produtos.router");
const clientes_router_1 = require("./06 - clientes/clientes.router");
const vendedores_router_1 = require("./07 - vendedores/vendedores.router");
const restaurants_router_1 = require("./80 - restaurants/restaurants.router");
const reviews_router_1 = require("./85 - reviews/reviews.router");
let rotas = [
    users_router_1.usersRouter,
    filiais_router_1.filiaisRouter,
    niveis_router_1.niveisRouter,
    safras_router_1.safrasRouter,
    culturas_router_1.culturasRouter,
    produtos_router_1.produtosRouter,
    clientes_router_1.clientesRouter,
    vendedores_router_1.vendedoresRouter,
    restaurants_router_1.restaurantRouter,
    reviews_router_1.reviewRouter
];
const server = new server_1.Server();
server.bootstrap(rotas).then(server => {
    console.log("Server is listening on: ", server.application.address());
}).catch(error => {
    console.log("Server failed to start");
    console.error(error);
    process.exit(1);
});
