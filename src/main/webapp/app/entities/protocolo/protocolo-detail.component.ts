import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProtocolo } from 'app/shared/model/protocolo.model';

@Component({
    selector: 'jhi-protocolo-detail',
    templateUrl: './protocolo-detail.component.html'
})
export class ProtocoloDetailComponent implements OnInit {
    protocolo: IProtocolo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ protocolo }) => {
            this.protocolo = protocolo;
        });
    }

    previousState() {
        window.history.back();
    }
}
