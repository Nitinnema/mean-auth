import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AcomponentComponent } from './acomponent/acomponent.component';

const routes: Routes = [
    { path: '', component: AcomponentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CustomRoutingModule {}
