"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const consola_1 = __importDefault(require("consola"));
const discord_js_1 = require("discord.js");
exports.default = {
    name: discord_js_1.Events.ClientReady,
    async execute(client) {
        if (client.user) {
            consola_1.default.success(chalk_1.default.green(`Logged in as ${client.user.tag}`));
        }
    },
};
