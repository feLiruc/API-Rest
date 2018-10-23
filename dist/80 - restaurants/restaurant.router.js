"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
class RestaurantRouter extends model_router_1.ModelRouter {
    constructor() {
        super(User);
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/restaurant', this.findAll);
        application.get('/restaurant/:id', [this.validateId, this.findById]);
        application.post('/restaurant', this.save);
        application.put('/restaurant/:id', [this.validateId, this.replace]);
        application.patch('/restaurant/:id', [this.validateId, this.update]);
        application.del('/restaurant/:id', [this.validateId, this.delete]);
    }
}
exports.restaurantRouter = new RestaurantRouter();
