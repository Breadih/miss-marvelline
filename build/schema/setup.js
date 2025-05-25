"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Mongoose schema for Channels
const ChannelsSchema = new mongoose_1.Schema({
    logsChannel: { type: String },
    DevAnnouncements: { type: String },
});
// Mongoose schema for UniverseActivity
const UniverseActivitySchema = new mongoose_1.Schema({
    GuildID: { type: Number },
    Channels: { type: ChannelsSchema },
});
exports.default = (0, mongoose_1.model)('GuildConfigs', UniverseActivitySchema);
