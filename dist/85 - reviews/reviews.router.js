"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
class ReviewRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restID = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurants/${restID}`;
        return resource;
    }
    // findById = (req, res, next) => {
    // 	this.model.findById(req.params.id)
    // 		.populate('user', 'name')
    // 		.populate('restaurant', 'name')
    // 		.then(this.render(res, next))
    // 		.catch(next)
    // }
    prepareOne(query) {
        return query
            .populate('user', 'name')
            .populate('restaurant', 'name');
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        // application.put('/reviews/:id', [this.validateId, this.replace])
        // application.patch('/reviews/:id', [this.validateId, this.update])
        // application.del('/reviews/:id', [this.validateId, this.delete])
    }
}
exports.reviewRouter = new ReviewRouter();
