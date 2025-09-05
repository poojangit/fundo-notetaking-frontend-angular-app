// src/app/shared/pipes/search-notes.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../../models/note';

@Pipe({
  name: 'searchNotes',
  pure: true
})
export class SearchNotesPipe implements PipeTransform {
  transform(notes: Note[], searchTerm: string = ''): Note[] {
    if (!searchTerm.trim()) return notes;

    return notes.filter(note =>
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}