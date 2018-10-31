import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProtocolo } from 'app/shared/model/protocolo.model';
import { ProtocoloService } from './protocolo.service';
import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from 'app/entities/usuario';
import { ILocal } from 'app/shared/model/local.model';
import { LocalService } from 'app/entities/local';

@Component({
    selector: 'jhi-protocolo-update',
    templateUrl: './protocolo-update.component.html'
})
export class ProtocoloUpdateComponent implements OnInit {
    protocolo: IProtocolo;
    isSaving: boolean;

    usuarios: IUsuario[];

    locals: ILocal[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private protocoloService: ProtocoloService,
        private usuarioService: UsuarioService,
        private localService: LocalService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ protocolo }) => {
            this.protocolo = protocolo;
        });
        this.usuarioService.query().subscribe(
            (res: HttpResponse<IUsuario[]>) => {
                this.usuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.localService.query().subscribe(
            (res: HttpResponse<ILocal[]>) => {
                this.locals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.protocolo.id !== undefined) {
            this.subscribeToSaveResponse(this.protocoloService.update(this.protocolo));
        } else {
            this.subscribeToSaveResponse(this.protocoloService.create(this.protocolo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProtocolo>>) {
        result.subscribe((res: HttpResponse<IProtocolo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUsuarioById(index: number, item: IUsuario) {
        return item.id;
    }

    trackLocalById(index: number, item: ILocal) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
