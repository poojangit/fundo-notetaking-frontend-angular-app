import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoteCardComponent } from './note-card/note-card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NoteCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, //This is for ngModel in search bar
    RouterModule
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    SidebarComponent,
    RouterModule,
    NoteCardComponent
  ]
})
export class SharedModule { }
