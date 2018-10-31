/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProtocoloTap1TestModule } from '../../../test.module';
import { ProtocoloDeleteDialogComponent } from 'app/entities/protocolo/protocolo-delete-dialog.component';
import { ProtocoloService } from 'app/entities/protocolo/protocolo.service';

describe('Component Tests', () => {
    describe('Protocolo Management Delete Component', () => {
        let comp: ProtocoloDeleteDialogComponent;
        let fixture: ComponentFixture<ProtocoloDeleteDialogComponent>;
        let service: ProtocoloService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProtocoloTap1TestModule],
                declarations: [ProtocoloDeleteDialogComponent]
            })
                .overrideTemplate(ProtocoloDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProtocoloDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProtocoloService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
