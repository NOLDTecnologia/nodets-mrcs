import { Request, Response } from "express";
import { BaseService } from "./BaseService";

export abstract class BaseController {
    protected _request: Request;
    protected _response: Response;
    protected _service: BaseService;
    
    constructor(service: BaseService, req: Request, res: Response) {
        this._request  = req;
        this._response = res;
        this._service  = service;
    }
}
