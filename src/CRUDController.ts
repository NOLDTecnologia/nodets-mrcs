import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { CRUDService } from "./CRUDService";

export abstract class CRUDController extends BaseController {
    protected _CRUDService: CRUDService;
    
    constructor(service: CRUDService, req: Request, res: Response) {
        super(service, req, res);
        this._CRUDService = service;
    }

    protected async getAll(): Promise<Response> {
        const result = await this._CRUDService.GetAll();
        return this._response.json(result);
    }

    protected async getByID(): Promise<Response> {
        try {
            const id = this.IDSendByGET();
            if (id === null) {
                return this._response.status(404).send({ status: "ERRO", message: "Error ID not found.", exception: null });
            } else {
                const result = await this._CRUDService.GetByID(id);
                return this._response.status(200).send(result);
            }
        } catch (ex) {
            return this._response.status(500).send({ ex });
        }
    }

    protected async create(): Promise<Response> {
        try {
            const result = await this._CRUDService.Create(this._request.body);
            return this._response.status(200).send(result);
        } catch (ex) {
            return this._response.status(500).send({ ex });
        }
    }

    protected async update(): Promise<Response> {
        try {
            const id = this.IDSendByPOST();
            const result = await this._CRUDService.Update(id, this._request.body);
            return this._response.status(200).send(result);
        } catch (ex) {
            return this._response.status(500).send({ ex });
        }
    }

    protected async delete(): Promise<Response> {
        try {
            const id = this.IDSendByPOST();
            const result = await this._CRUDService.Delete(id);
            return this._response.status(200).send({ deleted: result });
        } catch (ex) {
            return this._response.status(500).send({ ex });
        }
    }

    private IDSendByGET(): string | number | undefined {
        try {
            const { id } = this._request.params as { id: string | number | undefined};
            return id; 
        } catch (ex) {
            throw ({ status: "ERRO", message: "Error getting ID by GET.", exception: ex });
        }
    }

    private IDSendByPOST(): string | number {
        try {
            const { id } = this._request.body as { id: string | number };
            return id; 
        } catch (ex) {
            throw ({ status: "ERRO", message: "Error getting ID by POST.", exception: ex });
        }
    }
}
