import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocal } from 'app/shared/model/local.model';
import { Principal } from 'app/core';
import { LocalService } from './local.service';

@Component({
    selector: 'jhi-local',
    templateUrl: './local.component.html'
})
export class LocalComponent implements OnInit, OnDestroy {
    locals: ILocal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private localService: LocalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.localService.query().subscribe(
            (res: HttpResponse<ILocal[]>) => {
                this.locals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocal) {
        return item.id;
    }

    registerChangeInLocals() {
        this.eventSubscriber = this.eventManager.subscribe('localListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
