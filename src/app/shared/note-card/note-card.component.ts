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

  @Output() noteAction = new EventEmitter<{type: NoteActionType, note: Note, color?: string}>

  isHovered = false

  onMouseEnter() {
    this.isHovered = true
  }

  onMouseLeave() {
    this.isHovered == false
  }
}
