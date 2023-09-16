import { v4 } from "uuid";
import { Avaliacao } from "./avaliacao.model";

export class Aluno {
    private _id: string;
    private _avaliacoes: Avaliacao[];

    constructor(
        private _nome: string,
        private _email: string,
        private _idade: number,
        private _password: string
    ) {
        this._id = v4();
        this._avaliacoes = [];
    }

    public get id() {
        return this._id;
    }

    public get nome() {
        return this._nome;
    }

    public get avaliacoes() {
        return this._avaliacoes;
    }

    public toJson() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            idade: this._idade,
        };
    }

    public static create(
        id: string,
        nome: string,
        email: string,
        idade: number,
        password: string
    ) {
        const aluno = new Aluno(nome, email, idade, password);
        aluno._id = id;

        return aluno;
    }
}
