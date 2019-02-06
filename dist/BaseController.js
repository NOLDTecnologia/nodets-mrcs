"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(service, req, res) {
        this._request = req;
        this._response = res;
        this._service = service;
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map