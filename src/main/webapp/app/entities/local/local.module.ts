import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProtocoloTap1SharedModule } from 'app/shared';
import {
    LocalComponent,
    LocalDetailComponent,
    LocalUpdateComponent,
    LocalDeletePopupComponent,
    LocalDeleteDialogComponent,
    localRoute,
    localPopupRoute
} from './';

const ENTITY_STATES = [...localRoute, ...localPopupRoute];

@NgModule({
    imports: [ProtocoloTap1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LocalComponent, LocalDetailComponent, LocalUpdateComponent, LocalDeleteDialogComponent, LocalDeletePopupComponent],
    entryComponents: [LocalComponent, LocalUpdateComponent, LocalDeleteDialogComponent, LocalDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProtocoloTap1LocalModule {}
