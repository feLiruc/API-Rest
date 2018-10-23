"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const culturaSchema = new mongoose.Schema({
    CulturaDescricao: {
        type: String
    },
    CulturaCodigo: {
        type: Number
    },
    Depara: {
        type: String
    }
});
exports.Cultura = mongoose.model('Cultura', culturaSchema);
