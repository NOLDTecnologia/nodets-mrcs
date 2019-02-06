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
const BaseService_1 = require("./BaseService");
class CRUDService extends BaseService_1.BaseService {
    constructor(model, scope) {
        super(model, scope);
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const objReturn = this._model.scope(this._scope).findAll();
            return objReturn;
        });
    }
    GetByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._model.scope(this._scope).findByPk(id).then(obj => {
                    if (obj !== null) {
                        resolve(obj);
                    }
                    else {
                        reject({ Error: "Error ID not found.", Exception: null });
                    }
                }).catch(ex => {
                    reject({ status: "ERRO", message: "Error getting model by ID.", exception: ex });
                });
            });
        });
    }
    Create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._model.scope(this._scope).create(model).then((CREATEDROWS) => {
                    resolve(CREATEDROWS);
                }).catch(ex => {
                    reject({ status: "ERRO", message: "Error creating the register.", exception: ex });
                });
            });
        });
    }
    /**
     * Delete a register by ID
     * Parameters:
     *   - id: string or number of PK
     *   - model:
     */
    Update(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.GetByID(id).then(obj => {
                    obj.update(model).then((UPDATEDROWS) => {
                        resolve(UPDATEDROWS);
                    }).catch(ex => {
                        reject({ status: "ERRO", message: "Error updating the register.", exception: ex });
                    });
                }).catch(ex => reject(ex));
            });
        });
    }
    /**
     * Delete a register by ID
     * Parameters:
     *   - id: string or number of the model's PK
     */
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.GetByID(id).then(obj => {
                    obj.destroy().then((AFFECTEDROWS) => {
                        resolve(true);
                    }).catch(ex => {
                        reject({ status: "ERRO", message: "Error deleting the register.", exception: ex });
                    });
                }).catch(ex => { resolve(false); });
            });
        });
    }
}
exports.CRUDService = CRUDService;
//# sourceMappingURL=CRUDService.js.map