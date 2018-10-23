"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const clientes_model_1 = require("./clientes.model");
const restify_errors_1 = require("restify-errors");
class ClientesRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/culturas', (req, res, next) => {
            clientes_model_1.Cliente.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/culturas/:id', (req, res, next) => {
            clientes_model_1.Cliente.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/culturas', (req, res, next) => {
            let cliente = new clientes_model_1.Cliente(req.body);
            cliente.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/culturas/:id', (req, res, next) => {
            const opt = { overwrite: true };
            clientes_model_1.Cliente.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return clientes_model_1.Cliente.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/culturas/:id', (req, res, next) => {
            const opt = { new: true };
            clientes_model_1.Cliente.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/culturas/:id', (req, res, next) => {
            clientes_model_1.Cliente.remove({ _id: req.params.id }).exec()
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
exports.clientesRouter = new ClientesRouter();
