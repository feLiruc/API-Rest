"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const vendedorSchema = new mongoose.Schema({
    VendedorDescricao: {
        type: String
    },
    VendedorCodigo: {
        type: Number
    },
    Servidor: {
        type: String
    }
});
exports.Vendedor = mongoose.model('Vendedor', vendedorSchema, 'vendedores');
