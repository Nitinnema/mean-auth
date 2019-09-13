import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcomponentComponent } from './acomponent/acomponent.component';
import { BcomponentComponent } from './bcomponent/bcomponent.component';
import { CcomponentComponent } from './ccomponent/ccomponent.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AcomponentComponent,
        BcomponentComponent,
        CcomponentComponent
    ],
    exports: [
        AcomponentComponent,
        BcomponentComponent,
        CcomponentComponent
    ],
    providers: [],
    bootstrap: []
})

export class CustomModule {}
