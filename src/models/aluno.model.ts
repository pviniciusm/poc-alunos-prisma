import { v4 } from "uuid";

export class Aluno {
    private _id: string;

    constructor(private _nome: string, private _email: string, private _idade: number, private _password: string) {
        this._id = v4();
    }

    public get id() {
        return this._id;
    }

    public get nome() {
        return this._nome;
    }

    public toJson() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            idade: this._idade,
        };
    }
}
