import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { IProtocolo } from 'app/shared/model/protocolo.model';
import { ProtocoloService } from 'app/entities/protocolo';

@Component({
    selector: 'jhi-pessoa-update',
    templateUrl: './pessoa-update.component.html'
})
export class PessoaUpdateComponent implements OnInit {
    pessoa: IPessoa;
    isSaving: boolean;

    protocolos: IProtocolo[];
    dataNascDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pessoaService: PessoaService,
        private protocoloService: ProtocoloService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pessoa }) => {
            this.pessoa = pessoa;
        });
        this.protocoloService.query().subscribe(
            (res: HttpResponse<IProtocolo[]>) => {
                this.protocolos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pessoa.id !== undefined) {
            this.subscribeToSaveResponse(this.pessoaService.update(this.pessoa));
        } else {
            this.subscribeToSaveResponse(this.pessoaService.create(this.pessoa));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>) {
        result.subscribe((res: HttpResponse<IPessoa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProtocoloById(index: number, item: IProtocolo) {
        return item.id;
    }
}
