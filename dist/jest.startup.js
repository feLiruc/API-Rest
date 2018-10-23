"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jestCli = require("jest-cli");
const server_1 = require("./server/server");
const environment_1 = require("./common/environment");
const restaurants_router_1 = require("./80 - restaurants/restaurants.router");
const restaurants_model_1 = require("./80 - restaurants/restaurants.model");
const reviews_router_1 = require("./85 - reviews/reviews.router");
const reviews_model_1 = require("./85 - reviews/reviews.model");
const users_router_1 = require("./99 - users/users.router");
const users_model_1 = require("./99 - users/users.model");
let server;
let routes = [users_router_1.usersRouter, reviews_router_1.reviewRouter, restaurants_router_1.restaurantRouter];
const beforeAllTests = () => {
    environment_1.environment.db.url = process.env.DB_URL || 'mongodb://localhost/FV-test-db';
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server.bootstrap(routes)
        .then(() => users_model_1.User.remove({}).exec())
        .then(() => reviews_model_1.Review.remove({}).exec())
        .then(() => restaurants_model_1.Restaurant.remove({}).exec())
        .then(() => {
        let admin = new users_model_1.User();
        admin.name = 'admin';
        admin.email = 'admin@bridsolucoes.com.br';
        admin.password = '04011991';
        admin.profiles = ['admin', 'user'];
        return admin.save();
    });
};
const afterAllTests = () => {
    return server.shutdown();
};
beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
