import { SharedModule } from './../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [SidebarComponent],
    imports: [SharedModule, RouterModule],
    exports: [SidebarComponent, RouterModule]
})

export class SidebarModule { }

