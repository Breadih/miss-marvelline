"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Balance sub-schema
const balanceSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    balance: { type: Number, required: true },
    position: { type: String }
});
// Main schema
const UniverseActivitySchema = new mongoose_1.Schema({
    GuildID: { type: Number, required: true },
    coinName: { type: String },
    cRate: { type: Number },
    balance: { type: [balanceSchema], default: [] }
});
exports.default = (0, mongoose_1.model)('Economy', UniverseActivitySchema);
