"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const culturas_model_1 = require("./culturas.model");
const restify_errors_1 = require("restify-errors");
class CulturasRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/culturas', (req, res, next) => {
            culturas_model_1.Cultura.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/culturas/:id', (req, res, next) => {
            culturas_model_1.Cultura.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/culturas', (req, res, next) => {
            let cultura = new culturas_model_1.Cultura(req.body);
            cultura.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/culturas/:id', (req, res, next) => {
            const opt = { overwrite: true };
            culturas_model_1.Cultura.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return culturas_model_1.Cultura.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/culturas/:id', (req, res, next) => {
            const opt = { new: true };
            culturas_model_1.Cultura.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/culturas/:id', (req, res, next) => {
            culturas_model_1.Cultura.remove({ _id: req.params.id }).exec()
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
exports.culturasRouter = new CulturasRouter();
