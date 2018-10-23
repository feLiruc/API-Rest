"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const filiais_model_1 = require("./filiais.model");
const restify_errors_1 = require("restify-errors");
class FiliaisRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/filiais', (req, res, next) => {
            filiais_model_1.Filial.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/filiais/:id', (req, res, next) => {
            filiais_model_1.Filial.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/filiais', (req, res, next) => {
            let filial = new filiais_model_1.Filial(req.body);
            filial.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/filiais/:id', (req, res, next) => {
            const opt = { overwrite: true };
            filiais_model_1.Filial.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return filiais_model_1.Filial.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/filiais/:id', (req, res, next) => {
            const opt = { new: true };
            filiais_model_1.Filial.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/filiais/:id', (req, res, next) => {
            filiais_model_1.Filial.remove({ _id: req.params.id }).exec()
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
exports.filiaisRouter = new FiliaisRouter();
