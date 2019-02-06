"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class BaseRouter {
    constructor(controller) {
        this._controller = controller;
        this.router = express.Router();
    }
    handler(action) {
        return (req, res) => action.call(new this._controller(req, res));
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map