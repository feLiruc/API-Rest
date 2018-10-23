"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const filialSchema = new mongoose.Schema({
    FilialDescricao: {
        type: String
    },
    FilialCodigo: {
        type: String
    },
    Servidor: {
        type: String
    }
});
exports.Filial = mongoose.model('Filial', filialSchema, 'filiais');
