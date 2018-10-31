import { IPessoa } from 'app/shared/model//pessoa.model';

export interface IUsuario {
    id?: number;
    codUsu?: number;
    login?: string;
    senha?: string;
    email?: string;
    pessoa?: IPessoa;
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public codUsu?: number,
        public login?: string,
        public senha?: string,
        public email?: string,
        public pessoa?: IPessoa
    ) {}
}
