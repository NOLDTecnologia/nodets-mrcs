
export abstract class BaseService {
    protected _model: any;
    protected _scope: string;

    constructor(model: any, scope: string | "") {
        this._model = model;
        this._scope = scope;
    }
}
