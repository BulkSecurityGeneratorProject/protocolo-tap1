/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProtocoloTap1TestModule } from '../../../test.module';
import { ProtocoloDetailComponent } from 'app/entities/protocolo/protocolo-detail.component';
import { Protocolo } from 'app/shared/model/protocolo.model';

describe('Component Tests', () => {
    describe('Protocolo Management Detail Component', () => {
        let comp: ProtocoloDetailComponent;
        let fixture: ComponentFixture<ProtocoloDetailComponent>;
        const route = ({ data: of({ protocolo: new Protocolo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProtocoloTap1TestModule],
                declarations: [ProtocoloDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProtocoloDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProtocoloDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.protocolo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
