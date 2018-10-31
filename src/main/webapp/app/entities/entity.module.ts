import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProtocoloTap1LocalModule } from './local/local.module';
import { ProtocoloTap1PessoaModule } from './pessoa/pessoa.module';
import { ProtocoloTap1UsuarioModule } from './usuario/usuario.module';
import { ProtocoloTap1ProtocoloModule } from './protocolo/protocolo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ProtocoloTap1LocalModule,
        ProtocoloTap1PessoaModule,
        ProtocoloTap1UsuarioModule,
        ProtocoloTap1ProtocoloModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProtocoloTap1EntityModule {}
