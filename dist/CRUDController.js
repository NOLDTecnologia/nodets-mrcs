"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
class CRUDController extends BaseController_1.BaseController {
    constructor(service, req, res) {
        super(service, req, res);
        this._CRUDService = service;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._CRUDService.GetAll();
            return this._response.json(result);
        });
    }
    getByID() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = this.IDSendByGET();
                if (id === null) {
                    return this._response.status(404).send({ status: "ERRO", message: "Error ID not found.", exception: null });
                }
                else {
                    const result = yield this._CRUDService.GetByID(id);
                    return this._response.status(200).send(result);
                }
            }
            catch (ex) {
                return this._response.status(500).send({ ex });
            }
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._CRUDService.Create(this._request.body);
                return this._response.status(200).send(result);
            }
            catch (ex) {
                return this._response.status(500).send({ ex });
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = this.IDSendByPOST();
                const result = yield this._CRUDService.Update(id, this._request.body);
                return this._response.status(200).send(result);
            }
            catch (ex) {
                return this._response.status(500).send({ ex });
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = this.IDSendByPOST();
                const result = yield this._CRUDService.Delete(id);
                return this._response.status(200).send({ deleted: result });
            }
            catch (ex) {
                return this._response.status(500).send({ ex });
            }
        });
    }
    IDSendByGET() {
        try {
            const { id } = this._request.params;
            return id;
        }
        catch (ex) {
            throw ({ status: "ERRO", message: "Error getting ID by GET.", exception: ex });
        }
    }
    IDSendByPOST() {
        try {
            const { id } = this._request.body;
            return id;
        }
        catch (ex) {
            throw ({ status: "ERRO", message: "Error getting ID by POST.", exception: ex });
        }
    }
}
exports.CRUDController = CRUDController;
//# sourceMappingURL=CRUDController.js.map