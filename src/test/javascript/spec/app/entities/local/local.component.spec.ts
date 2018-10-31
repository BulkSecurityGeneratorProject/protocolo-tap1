/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProtocoloTap1TestModule } from '../../../test.module';
import { LocalComponent } from 'app/entities/local/local.component';
import { LocalService } from 'app/entities/local/local.service';
import { Local } from 'app/shared/model/local.model';

describe('Component Tests', () => {
    describe('Local Management Component', () => {
        let comp: LocalComponent;
        let fixture: ComponentFixture<LocalComponent>;
        let service: LocalService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProtocoloTap1TestModule],
                declarations: [LocalComponent],
                providers: []
            })
                .overrideTemplate(LocalComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Local(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.locals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
