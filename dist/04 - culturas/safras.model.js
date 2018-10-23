"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const safraSchema = new mongoose.Schema({
    SafraDescricao: {
        type: String
    }
});
exports.Safra = mongoose.model('Safra', safraSchema);
