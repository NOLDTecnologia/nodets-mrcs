"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = require("./BaseRouter");
class CRUDRouter extends BaseRouter_1.BaseRouter {
    constructor(controller) {
        super(controller);
        this.router
            .get("/", this.handler(this._controller.prototype.getAll))
            .get("/:id", this.handler(this._controller.prototype.getByID))
            .post("/", this.handler(this._controller.prototype.create))
            .put("/", this.handler(this._controller.prototype.update))
            .delete("/", this.handler(this._controller.prototype.delete));
    }
}
exports.CRUDRouter = CRUDRouter;
//# sourceMappingURL=CRUDRouter.js.map