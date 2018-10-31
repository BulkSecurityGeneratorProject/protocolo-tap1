import { Moment } from 'moment';
import { IProtocolo } from 'app/shared/model//protocolo.model';

export const enum Sexo {
    Masculino = 'Masculino',
    Feminino = 'Feminino'
}

export interface IPessoa {
    id?: number;
    codPessoa?: number;
    nome?: string;
    dataNasc?: Moment;
    sexo?: Sexo;
    protocolo?: IProtocolo;
}

export class Pessoa implements IPessoa {
    constructor(
        public id?: number,
        public codPessoa?: number,
        public nome?: string,
        public dataNasc?: Moment,
        public sexo?: Sexo,
        public protocolo?: IProtocolo
    ) {}
}
