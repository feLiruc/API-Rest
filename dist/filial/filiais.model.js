"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const filialSchema = new mongoose.Schema({
    FilialDescricao: {
        required: true
    },
    FilialCodigo: {
        required: true
    },
    Servidor: {
        required: true
    }
});
exports.Filial = mongoose.model('Filial', filialSchema);
