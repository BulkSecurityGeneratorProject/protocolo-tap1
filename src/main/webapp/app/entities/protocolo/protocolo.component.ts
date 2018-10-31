import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProtocolo } from 'app/shared/model/protocolo.model';
import { Principal } from 'app/core';
import { ProtocoloService } from './protocolo.service';

@Component({
    selector: 'jhi-protocolo',
    templateUrl: './protocolo.component.html'
})
export class ProtocoloComponent implements OnInit, OnDestroy {
    protocolos: IProtocolo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private protocoloService: ProtocoloService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.protocoloService.query().subscribe(
            (res: HttpResponse<IProtocolo[]>) => {
                this.protocolos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProtocolos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProtocolo) {
        return item.id;
    }

    registerChangeInProtocolos() {
        this.eventSubscriber = this.eventManager.subscribe('protocoloListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
