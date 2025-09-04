import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NoteInputComponent } from './note-input/note-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchiveComponent } from '../archive/archive.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NoteInputComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
