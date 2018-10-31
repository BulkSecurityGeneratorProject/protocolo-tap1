export interface ILocal {
    id?: number;
    codLocal?: number;
    descLocal?: string;
}

export class Local implements ILocal {
    constructor(public id?: number, public codLocal?: number, public descLocal?: string) {}
}
