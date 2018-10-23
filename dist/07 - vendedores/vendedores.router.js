"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const vendedores_model_1 = require("./vendedores.model");
const restify_errors_1 = require("restify-errors");
class VendedoresRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/vendedores', (req, res, next) => {
            vendedores_model_1.Vendedor.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/vendedores/:id', (req, res, next) => {
            vendedores_model_1.Vendedor.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/vendedores', (req, res, next) => {
            let vendedor = new vendedores_model_1.Vendedor(req.body);
            vendedor.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/vendedores/:id', (req, res, next) => {
            const opt = { overwrite: true };
            vendedores_model_1.Vendedor.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return vendedores_model_1.Vendedor.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/vendedores/:id', (req, res, next) => {
            const opt = { new: true };
            vendedores_model_1.Vendedor.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/vendedores/:id', (req, res, next) => {
            vendedores_model_1.Vendedor.remove({ _id: req.params.id }).exec()
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
exports.vendedoresRouter = new VendedoresRouter();
