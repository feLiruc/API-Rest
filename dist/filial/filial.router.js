"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const filial_model_1 = require("./filial.model");
const restify_errors_1 = require("restify-errors");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/filial', (req, res, next) => {
            filial_model_1.Filial.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/filial/:id', (req, res, next) => {
            filial_model_1.Filial.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/filial', (req, res, next) => {
            let filial = new filial_model_1.Filial(req.body);
            filial.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/filial/:id', (req, res, next) => {
            const opt = { overwrite: true };
            filial_model_1.Filial.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return filial_model_1.Filial.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/filial/:id', (req, res, next) => {
            const opt = { new: true };
            filial_model_1.Filial.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/filial/:id', (req, res, next) => {
            filial_model_1.Filial.remove({ _id: req.params.id }).exec()
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
exports.usersRouter = new UsersRouter();
