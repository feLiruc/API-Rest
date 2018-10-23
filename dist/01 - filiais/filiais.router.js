"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const filiais_model_1 = require("./filiais.model");
class FiliaisRouter extends model_router_1.ModelRouter {
    constructor() {
        super(filiais_model_1.Filial);
    }
    applyRoutes(application) {
        application.get('/filiais', this.findAll);
        application.get('/filiais/:id', [this.validateId, this.findById]);
        application.post('/filiais', this.save);
        application.put('/filiais/:id', [this.validateId, this.replace]);
        application.patch('/filiais/:id', [this.validateId, this.update]);
        application.del('/filiais/:id', [this.validateId, this.delete]);
    }
}
exports.filiaisRouter = new FiliaisRouter();
