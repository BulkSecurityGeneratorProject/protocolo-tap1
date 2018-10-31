/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProtocoloTap1TestModule } from '../../../test.module';
import { ProtocoloComponent } from 'app/entities/protocolo/protocolo.component';
import { ProtocoloService } from 'app/entities/protocolo/protocolo.service';
import { Protocolo } from 'app/shared/model/protocolo.model';

describe('Component Tests', () => {
    describe('Protocolo Management Component', () => {
        let comp: ProtocoloComponent;
        let fixture: ComponentFixture<ProtocoloComponent>;
        let service: ProtocoloService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProtocoloTap1TestModule],
                declarations: [ProtocoloComponent],
                providers: []
            })
                .overrideTemplate(ProtocoloComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProtocoloComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProtocoloService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Protocolo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.protocolos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
