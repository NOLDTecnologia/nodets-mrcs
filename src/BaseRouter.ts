import * as express from "express";
import { BaseController } from "..";

export abstract class BaseRouter {
    public  router: express.Router;
    protected _controller: any;

    constructor(controller: BaseController) {
        this._controller = controller;
        this.router = express.Router();
    }
    
    protected handler(action: () => void): any {
        return (req: express.Request, res: express.Response) => 
            action.call(new this._controller(req, res));
    }
}
