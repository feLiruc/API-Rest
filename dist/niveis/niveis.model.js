"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const nivelSchema = new mongoose.Schema({
    NivelTecnologia: {
        type: String
    }
});
exports.Nivel = mongoose.model('Nivel', nivelSchema, 'niveis');
