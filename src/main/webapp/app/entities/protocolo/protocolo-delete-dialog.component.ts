import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProtocolo } from 'app/shared/model/protocolo.model';
import { ProtocoloService } from './protocolo.service';

@Component({
    selector: 'jhi-protocolo-delete-dialog',
    templateUrl: './protocolo-delete-dialog.component.html'
})
export class ProtocoloDeleteDialogComponent {
    protocolo: IProtocolo;

    constructor(private protocoloService: ProtocoloService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.protocoloService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'protocoloListModification',
                content: 'Deleted an protocolo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-protocolo-delete-popup',
    template: ''
})
export class ProtocoloDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ protocolo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProtocoloDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.protocolo = protocolo;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
