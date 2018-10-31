import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Protocolo } from 'app/shared/model/protocolo.model';
import { ProtocoloService } from './protocolo.service';
import { ProtocoloComponent } from './protocolo.component';
import { ProtocoloDetailComponent } from './protocolo-detail.component';
import { ProtocoloUpdateComponent } from './protocolo-update.component';
import { ProtocoloDeletePopupComponent } from './protocolo-delete-dialog.component';
import { IProtocolo } from 'app/shared/model/protocolo.model';

@Injectable({ providedIn: 'root' })
export class ProtocoloResolve implements Resolve<IProtocolo> {
    constructor(private service: ProtocoloService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((protocolo: HttpResponse<Protocolo>) => protocolo.body));
        }
        return of(new Protocolo());
    }
}

export const protocoloRoute: Routes = [
    {
        path: 'protocolo',
        component: ProtocoloComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'protocoloTap1App.protocolo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'protocolo/:id/view',
        component: ProtocoloDetailComponent,
        resolve: {
            protocolo: ProtocoloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'protocoloTap1App.protocolo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'protocolo/new',
        component: ProtocoloUpdateComponent,
        resolve: {
            protocolo: ProtocoloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'protocoloTap1App.protocolo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'protocolo/:id/edit',
        component: ProtocoloUpdateComponent,
        resolve: {
            protocolo: ProtocoloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'protocoloTap1App.protocolo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const protocoloPopupRoute: Routes = [
    {
        path: 'protocolo/:id/delete',
        component: ProtocoloDeletePopupComponent,
        resolve: {
            protocolo: ProtocoloResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'protocoloTap1App.protocolo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
