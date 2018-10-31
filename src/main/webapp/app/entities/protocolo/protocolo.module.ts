import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProtocoloTap1SharedModule } from 'app/shared';
import {
    ProtocoloComponent,
    ProtocoloDetailComponent,
    ProtocoloUpdateComponent,
    ProtocoloDeletePopupComponent,
    ProtocoloDeleteDialogComponent,
    protocoloRoute,
    protocoloPopupRoute
} from './';

const ENTITY_STATES = [...protocoloRoute, ...protocoloPopupRoute];

@NgModule({
    imports: [ProtocoloTap1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProtocoloComponent,
        ProtocoloDetailComponent,
        ProtocoloUpdateComponent,
        ProtocoloDeleteDialogComponent,
        ProtocoloDeletePopupComponent
    ],
    entryComponents: [ProtocoloComponent, ProtocoloUpdateComponent, ProtocoloDeleteDialogComponent, ProtocoloDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProtocoloTap1ProtocoloModule {}
