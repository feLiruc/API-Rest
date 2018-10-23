"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const clienteSchema = new mongoose.Schema({
    ClienteDescricao: {
        type: String
    },
    ClienteCodigo: {
        type: Number
    },
    Servidor: {
        type: String
    }
});
exports.Cliente = mongoose.model('Cliente', clienteSchema);
