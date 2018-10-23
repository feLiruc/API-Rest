"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const safras_model_1 = require("./safras.model");
const restify_errors_1 = require("restify-errors");
class SafrasRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/safras', (req, res, next) => {
            safras_model_1.Safra.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/safras/:id', (req, res, next) => {
            safras_model_1.Safra.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/safras', (req, res, next) => {
            let safra = new safras_model_1.Safra(req.body);
            safra.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/safras/:id', (req, res, next) => {
            const opt = { overwrite: true };
            safras_model_1.Safra.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return safras_model_1.Safra.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/safras/:id', (req, res, next) => {
            const opt = { new: true };
            safras_model_1.Safra.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/safras/:id', (req, res, next) => {
            safras_model_1.Safra.remove({ _id: req.params.id }).exec()
                .then((cmdResult) => {
                if (cmdResult.result.n) {
                    res.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
                return next();
            })
                .catch(next);
        });
    }
}
exports.safrasRouter = new SafrasRouter();
