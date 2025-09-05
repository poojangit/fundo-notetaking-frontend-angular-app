import { Component, HostBinding, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note, NoteActionType } from '../models/note';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashedNotes: Note[] = [];

  // ✅ Required by template
  sidebarExpanded: boolean = false;
  layoutType: 'grid' | 'list' = 'grid'; // Optional, for consistency

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadTrashedNotes();
  }

  loadTrashedNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (response) => {
        this.trashedNotes = response.data.data.filter(n => n.isDeleted);
        console.log('🗑️ Trashed Notes:', this.trashedNotes);
      },
      error: err => console.error('❌ Failed to load trashed notes:', err)
    });
  }

  // ✅ Fixes viewModeChanged binding in HTML
  onViewModeChanged(isGridView: boolean) {
    this.layoutType = isGridView ? 'grid' : 'list';
  }

  // ✅ Fixes (noteAction) binding
  handleNoteAction(event: { type: NoteActionType, note: Note, color?: string }) {
    const { type, note } = event;

    if (type === 'color' && event.color) {
      note.color = event.color;
      this.noteService.updateNoteColor(note.id!, event.color).subscribe({
        next: () => console.log('✔️ Color updated in trash'),
        error: err => console.error('❌ Color update failed in trash', err)
      });
    }

    if (type === 'restore') {
      note.isDeleted = false;
      this.trashedNotes = this.trashedNotes.filter(n => n.id !== note.id);

      this.noteService.trashNote(note.id!, false).subscribe({
        next: () => console.log('♻️ Note restored'),
        error: (err) => console.error('❌ Restore failed', err)
      });
    }

    if (type === 'deleteForever') {
      this.trashedNotes = this.trashedNotes.filter(n => n.id !== note.id);

      this.noteService.deleteNotePermanently(note.id!).subscribe({
        next: () => console.log('🗑️ Deleted forever'),
        error: err => console.error('❌ Delete forever failed', err)
      });
    }

    if (type === 'trash') {
      console.log('🗑️ Already trashed. You can implement Restore/Delete Forever here.');
      // We'll add permanent delete and restore logic later
    }
  }

  //  Add this if you want sidebar animations like Dashboard
  @HostBinding('class.sidebar-expanded')
  get expandedClass(): boolean {
    return this.sidebarExpanded;
  }
 
}