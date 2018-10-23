"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const filiais_model_1 = require("./filiais.model");
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
        // application.put('/filiais/:id', (req, res, next) => {
        // 	const opt = { overwrite: true }
        // 	Filial.update({_id: req.params.id}, req.body, opt)
        // 		.exec().then(result=> {
        // 			if(result.n){
        // 				return Filial.findById(req.params.id)
        // 			}else{
        // 				throw new NotFoundError('Documento não encontrado')
        // 			}
        // 	}).then(this.render(res, next))
        // 	  .catch(next)
        // })
        // application.patch('/filiais/:id', (req, res, next) => {
        // 	const opt = {new: true}
        // 	Filial.findByIdAndUpdate(req.params.id, req.body, opt)
        // 		.then(this.render(res, next))
        // 		.catch(next)
        // })
        // application.del('/filiais/:id', (req, res, next) => {
        // 	Filial.remove({_id: req.params.id}).exec()
        // 		.then((cmdResult: any) => {
        // 			if(cmdResult.result.n){
        // 				res.send(204)
        // 			}else{
        // 				throw new NotFoundError('Documento não encontrado')
        // 			}
        // 			return next()
        // 		})
        // 		.catch(next)
        // })
    }
}
exports.filiaisRouter = new FiliaisRouter();
