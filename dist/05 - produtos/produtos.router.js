"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const produtos_model_1 = require("./produtos.model");
const restify_errors_1 = require("restify-errors");
class ProdutosRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/produtos', (req, res, next) => {
            produtos_model_1.Produto.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/produtos/:id', (req, res, next) => {
            produtos_model_1.Produto.findById(req.params.id)
                .then(this.render(res, next))
                .catch(next);
        });
        application.post('/produtos', (req, res, next) => {
            let produto = new produtos_model_1.Produto(req.body);
            produto.save()
                .then(this.render(res, next))
                .catch(next);
        });
        application.put('/produtos/:id', (req, res, next) => {
            const opt = { overwrite: true };
            produtos_model_1.Produto.update({ _id: req.params.id }, req.body, opt)
                .exec().then(result => {
                if (result.n) {
                    return produtos_model_1.Produto.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado');
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        application.patch('/produtos/:id', (req, res, next) => {
            const opt = { new: true };
            produtos_model_1.Produto.findByIdAndUpdate(req.params.id, req.body, opt)
                .then(this.render(res, next))
                .catch(next);
        });
        application.del('/produtos/:id', (req, res, next) => {
            produtos_model_1.Produto.remove({ _id: req.params.id }).exec()
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
exports.produtosRouter = new ProdutosRouter();
