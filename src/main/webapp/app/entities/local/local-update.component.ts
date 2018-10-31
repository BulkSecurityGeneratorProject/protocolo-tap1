import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILocal } from 'app/shared/model/local.model';
import { LocalService } from './local.service';

@Component({
    selector: 'jhi-local-update',
    templateUrl: './local-update.component.html'
})
export class LocalUpdateComponent implements OnInit {
    local: ILocal;
    isSaving: boolean;

    constructor(private localService: LocalService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ local }) => {
            this.local = local;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.local.id !== undefined) {
            this.subscribeToSaveResponse(this.localService.update(this.local));
        } else {
            this.subscribeToSaveResponse(this.localService.create(this.local));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocal>>) {
        result.subscribe((res: HttpResponse<ILocal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
