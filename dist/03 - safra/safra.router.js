"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const niveis_model_1 = require("./niveis.model");
const restify_errors_1 = require("restify-errors");
class NiveisRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/niveis', (req, res, next) => {
            niveis_model_1.Nivel.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/niveis/:id', (req, res, next) => {
            niveis_model_1.Nivel.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/niveis', (req, res, next) => {
            let nivel = new niveis_model_1.Nivel(req.body);
            nivel.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/niveis/:id', (req, res, next) => {
            const opt = { overwrite: true };
            niveis_model_1.Nivel.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return niveis_model_1.Nivel.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/niveis/:id', (req, res, next) => {
            const opt = { new: true };
            niveis_model_1.Nivel.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/niveis/:id', (req, res, next) => {
            niveis_model_1.Nivel.remove({ _id: req.params.id }).exec()
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
exports.niveisRouter = new NiveisRouter();
