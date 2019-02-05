import { BaseService } from "..";

export abstract class CRUDService extends BaseService {
    constructor(model: any, scope: string | "") {
        super(model, scope);
    }
        
    public async GetAll() {
        const objReturn = this._model.scope(this._scope).findAll();
        return objReturn;
    }

    public async GetByID(id: string | number | undefined): Promise<any> {
        return new Promise((resolve, reject) => {
            this._model.scope(this._scope).findByPk(id).then(obj => {
                if (obj !== null) {
                    resolve(obj);
                } else {
                    reject({ Error: "Error ID not found.", Exception: null });
                }
            }).catch(ex => {
                reject({ status: "ERRO", message: "Error getting model by ID.", exception: ex });
            });
        });
    }

    public async Create(model: any): Promise<any> {
        return new Promise((resolve, reject) => { 
            this._model.scope(this._scope).create(model).then((CREATEDROWS) => {
                resolve(CREATEDROWS);
            }).catch(ex => {
                reject({ status: "ERRO", message: "Error creating the register.", exception: ex });
            });
        });
    }
    
    /**
     * Delete a register by ID
     * Parameters: 
     *   - id: string or number of PK 
     *   - model: 
     */
    public async Update(id: string | number, model: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.GetByID(id).then(obj => {
                obj.update(model).then((UPDATEDROWS) => {
                    resolve(UPDATEDROWS);
                }).catch(ex => {
                    reject({ status: "ERRO", message: "Error updating the register.", exception: ex });
                });
            }).catch(ex => reject(ex));
        });
    }

    /**
     * Delete a register by ID
     * Parameters: 
     *   - id: string or number of the model's PK 
     */
    public async Delete(id: string | number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.GetByID(id).then(obj => {
                obj.destroy().then((AFFECTEDROWS) => {
                    resolve(true);
                }).catch(ex => {
                    reject({ status: "ERRO", message: "Error deleting the register.", exception: ex });
                });
            }).catch(ex => { resolve(false); });
        });
    }
}
