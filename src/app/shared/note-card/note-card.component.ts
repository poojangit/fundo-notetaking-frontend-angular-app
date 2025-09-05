import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note, NoteActionType } from 'src/app/models/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() note!: Note
  @Input() layout: 'grid' | 'list' = 'grid'
  @Input() isInArchiveSection: boolean = false
  @Input() isInArchive: boolean = false

  @Output() noteAction = new EventEmitter<{type: NoteActionType, note: Note, color?: string}>

  isHovered = false

  onMouseEnter() {
    this.isHovered = true
  }

  onMouseLeave() {
    this.isHovered = false
  }

  onArchive(note:Note){
    this.noteAction.emit({type: 'archive', note})
  }

  onTrash(note: Note) {
    this.noteAction.emit({type: 'trash', note});
  }

  onColorChange(event: {note: Note; color: string}){
    this.noteAction.emit({type: 'color', note: event.note, color: event.color})
  }

  onRestore(note: Note) {
    this.noteAction.emit({ type: 'restore', note });
  }

  onDeleteForever(note: Note) {
    this.noteAction.emit({ type: 'deleteForever', note });
  }
}
