"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const produtoSchema = new mongoose.Schema({
    Servidor: {
        type: String
    },
    ProdutoDescricao: {
        type: String
    },
    FamiliaDescricao: {
        type: String
    },
    ProdutoCodigo: {
        type: String
    }
});
exports.Produto = mongoose.model('Produto', produtoSchema);
