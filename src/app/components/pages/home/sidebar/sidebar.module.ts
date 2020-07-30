import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../shared/shared.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [SidebarComponent],
    imports: [SharedModule, RouterModule],
    exports: [SidebarComponent, RouterModule]
})

export class SidebarModule { }

