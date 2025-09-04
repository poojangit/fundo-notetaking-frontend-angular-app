import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-note-toolbar',
  templateUrl: './note-toolbar.component.html',
  styleUrls: ['./note-toolbar.component.scss']
})
export class NoteToolbarComponent {
  @Input() note!: Note
  @Input() isInArchive: boolean = false
  @Output() colorChange = new EventEmitter<{note: Note, color: string}>()
  @Output() archive = new EventEmitter<Note>()

  showColorPalette = false

  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
  ];

  toggleColorPalette() {
    this.showColorPalette = !this.showColorPalette;
  }
    selectColor(color: string) {
    this.colorChange.emit({ note: this.note, color });
    this.showColorPalette = false;
  }

  onArchive() {
    this.archive.emit(this.note)
  }
}
