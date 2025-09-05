import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteToolbarComponent } from './note-toolbar/note-toolbar.component';
import { SearchNotesPipe } from './pipes/search-pipes.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NoteCardComponent,
    NoteToolbarComponent,
    SearchNotesPipe
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
    NoteCardComponent,
    NoteToolbarComponent,
    SearchNotesPipe
  ]
})
export class SharedModule { }
