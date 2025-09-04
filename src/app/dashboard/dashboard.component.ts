import { Component, HostBinding, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note, NoteActionType } from '../models/note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  // 🔄 Sidebar state toggling
  sidebarExpanded: boolean = false

  // 🧩 Notes array to store API response
  notes: Note[] = [];

  //📐 Layout toggle: 'grid' (default) or 'list'
  layoutType: 'grid' | 'list' = 'grid'

  
  constructor(private noteService: NoteService) {
    // ✅ NoteService injected to fetch notes
  }

  ngOnInit(): void {
    console.log('✅ Dashboard initialized');
    this.loadNotes(); // 📥 Load saved notes on dashboard load
  }

  // 🔄 Method to toggle sidebar (used by header menu icon)
  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded
  }

  // 🧠 Add class to host element to update layout CSS
  @HostBinding('class.sidebar-expanded')
  get expandedClass() : boolean {
    return this.sidebarExpanded
  }

  // 📥 Load notes from backend using NoteService
  loadNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (response) => {
        // 🔍 Only show active (non-archived, non-deleted) notes on dashboard
        this.notes = response.data.data.filter(note => !note.isArchived && !note.isDeleted);
        console.log('✅ Notes fetched:', this.notes);
      },
      error: (err) => {
        console.error('❌ Failed to load notes:', err);
      }
    });
  }
  
  handleNoteAction(event: {type: NoteActionType, note: Note, color?: string}){
   const{type,note, color} = event

  }


  onViewModeChanged(isGridView: boolean){
    this.layoutType = isGridView ? 'grid': 'list'
  }
}
