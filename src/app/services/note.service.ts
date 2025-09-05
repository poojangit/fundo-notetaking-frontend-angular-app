import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<{ data: { data: Note[] } }> {
    const token = localStorage.getItem('token');
    console.log("📥 Token used in getNotes():", token); // Debug

    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json'

    });

    return this.http.get<{ data: { data: Note[] } }>(`${this.baseUrl}/getNotesList`, { headers });

  }

  addNote(note: Note): Observable<any> {
    const token = localStorage.getItem('token');
    console.log("📥 Token used in addNote():", token); // Debug

    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      title: note.title,
      description: note.description,
      color: note.color,
      isArchived: note.isArchived || false,
      isPined: note.isPined || false,
      isDeleted: note.isDeleted || false
    };

    return this.http.post(`${this.baseUrl}/addNotes`, body, { headers});
  }


  updateNoteColor(noteId: string, color: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      noteIdList: [noteId],
      color
    };

    return this.http.post(`${this.baseUrl}/changesColorNotes`, body, { headers });
  }


  archiveNote(noteId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      noteIdList: [noteId],
      isArchived: true
    };

    return this.http.post(`${this.baseUrl}/archiveNotes`, body, { headers });
  }

  unarchiveNote(noteId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      noteIdList: [noteId],
      isArchived: false
    };

    return this.http.post(`${this.baseUrl}/archiveNotes`, body, { headers });
  }


  trashNote(noteId: string , isDeleted:boolean = true): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      noteIdList: [noteId],
      isDeleted
    };

    return this.http.post(`${this.baseUrl}/trashNotes`, body, { headers });
  }


  deleteNotePermanently(noteId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      noteIdList: [noteId]
    };

    return this.http.post(`${this.baseUrl}/deleteForeverNotes`, body, { headers });
  }


}