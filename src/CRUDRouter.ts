import { BaseRouter, CRUDController } from "..";

export abstract class CRUDRouter extends BaseRouter {

    constructor(controller: CRUDController) {
        super(controller);
        
        this.router
            .get("/"   , this.handler(this._controller.prototype.getAll))
            .get("/:id", this.handler(this._controller.prototype.getByID))
            .post("/"  , this.handler(this._controller.prototype.create))
            .put("/"   , this.handler(this._controller.prototype.update))
            .delete("/", this.handler(this._controller.prototype.delete));
    }
}

