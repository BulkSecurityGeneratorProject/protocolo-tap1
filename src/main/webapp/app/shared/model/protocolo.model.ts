import { IPessoa } from 'app/shared/model//pessoa.model';
import { IUsuario } from 'app/shared/model//usuario.model';
import { ILocal } from 'app/shared/model//local.model';

export interface IProtocolo {
    id?: number;
    requerentes?: IPessoa[];
    usuario?: IUsuario;
    origems?: ILocal[];
    destinos?: ILocal[];
}

export class Protocolo implements IProtocolo {
    constructor(
        public id?: number,
        public requerentes?: IPessoa[],
        public usuario?: IUsuario,
        public origems?: ILocal[],
        public destinos?: ILocal[]
    ) {}
}
