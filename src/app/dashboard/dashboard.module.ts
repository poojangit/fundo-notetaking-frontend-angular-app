import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NoteInputComponent } from './note-input/note-input.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NoteInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
