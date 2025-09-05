import { Component, HostBinding, OnInit } from '@angular/core';
import { Note, NoteActionType } from '../models/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit{

  notes: Note[] = []
  layoutType: 'grid' | 'list' = 'grid'
  sidebarExpanded: boolean = false

  constructor(private noteService: NoteService) {}

  @HostBinding('class.sidebar-expanded')
  get expandedClass(): boolean {
    return this.sidebarExpanded
  }

  ngOnInit(): void {
    this.loadArchivedNotes()
  }
  onViewModeChanged(isGrid: boolean){
    this.layoutType = isGrid ? 'grid' : 'list'
  }

  loadArchivedNotes() : void {
    this.noteService.getNotes().subscribe({
      next: (response) => {
        this.notes = response.data.data.filter(note => note.isArchived && !note.isDeleted)
        console.log('📦 Archived Notes:', this.notes);
      }, 
      error: err => console.error('❌ Failed to load archived notes', err)
    })
  }
 handleNoteAction(event: { type: NoteActionType, note: Note, color?: string }) {
    const { type, note, color } = event;

    if (type === 'trash') {
      note.isDeleted = true;
      this.notes = this.notes.filter(n => n.id !== note.id);

      this.noteService.trashNote(note.id!, true ).subscribe({
        next: () => console.log('🗑️ Moved to Trash'),
        error: (err: any) => console.error('❌ Restore failed', err)
      });
    }

    if (type === 'archive') {
      // In Archive view, archive = Unarchive
      note.isArchived = false;
      this.notes = this.notes.filter(n => n.id !== note.id);

      this.noteService.unarchiveNote(note.id!).subscribe({
        next: () => console.log('📤 Unarchived'),
        error: (err) => console.error('❌ Unarchive failed', err)
      });

    }

    if (type === 'color' && color) {
      note.color = color;
      this.noteService.updateNoteColor(note.id!, color).subscribe({
        next: () => console.log('🎨 Color updated'),
        error: err => console.error('❌ Color update failed', err)
      });
    }
  }

}
