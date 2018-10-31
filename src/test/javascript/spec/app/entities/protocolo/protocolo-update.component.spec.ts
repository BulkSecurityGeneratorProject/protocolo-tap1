/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProtocoloTap1TestModule } from '../../../test.module';
import { ProtocoloUpdateComponent } from 'app/entities/protocolo/protocolo-update.component';
import { ProtocoloService } from 'app/entities/protocolo/protocolo.service';
import { Protocolo } from 'app/shared/model/protocolo.model';

describe('Component Tests', () => {
    describe('Protocolo Management Update Component', () => {
        let comp: ProtocoloUpdateComponent;
        let fixture: ComponentFixture<ProtocoloUpdateComponent>;
        let service: ProtocoloService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProtocoloTap1TestModule],
                declarations: [ProtocoloUpdateComponent]
            })
                .overrideTemplate(ProtocoloUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProtocoloUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProtocoloService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Protocolo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.protocolo = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Protocolo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.protocolo = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
