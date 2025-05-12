"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    data;
    execute;
    category;
    constructor(options) {
        this.data = options.data;
        this.execute = options.execute;
        this.category = options.category ?? 'admin';
    }
}
exports.default = Command;
