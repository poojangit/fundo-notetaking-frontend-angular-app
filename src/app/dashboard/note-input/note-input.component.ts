import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.scss']
})
export class NoteInputComponent {
  isExpanded = false
  title = ''
  content = ''
  selectedColor = '#ffffff'
  selectedTextFormat: 'normal' | 'heading' | 'subheading' = 'normal';
  showColorPalette = false
  showTextFormatDropdown = false

  colors : string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
  ]

   textFormats = [
    { label: 'Normal text', value: 'normal' },
    { label: 'Heading', value: 'heading' },
    { label: 'Subheading', value: 'subheading' }
  ];

  @Output() noteCreated = new EventEmitter<void>()  // NEW output to give update to the dashboard

  constructor(private noteService: NoteService){}

  expand(): void {
    this.isExpanded = true
    this.closeDropdowns()
  }

  close(): void {
    this.saveNote()
  }

  saveNote() : void {
    if(this.title.trim() || this.content.trim()) {
      const newNote: Note = {
        title: this.title,
        description: this.content,
        color: this.selectedColor,
        textFormat: this.selectedTextFormat,
        isArchived: false,
        isDeleted: false,
        isPined: false
      }

      this.noteService.addNote(newNote).subscribe({
        next: (res: any) => {
          console.log("Note save successfully: ", res);
          this.noteCreated.emit() //Notify the dashboard
        },
        error: (err:any) => {
          console.error("Error saving note: " , err)
        }
      })
    }
  }

  autoGrowTextarea(event: Event):void {
    const textarea = event.target as HTMLTextAreaElement
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
 toggleColorPalette(event: Event): void {
    event.stopPropagation();
    this.showColorPalette = !this.showColorPalette;
    this.showTextFormatDropdown = false;
  }

  toggleTextFormatDropdown(event: Event): void {
    event.stopPropagation()
    this.showTextFormatDropdown = !this.showTextFormatDropdown
    this.showColorPalette = false
  }

  setColor(color: string, event: Event) : void {
    event.stopPropagation()
    this.selectedColor = color
    this.showColorPalette = false
  }

  selectTextFormat(format: string, event: Event) : void {
    event.stopPropagation()
    if(['normal', 'heading', 'subheading'].includes(format)) {
      this.selectedTextFormat = format as 'normal' | 'heading' | 'subheading'
    }
    this.showTextFormatDropdown = false
  }

  @HostListener('document:click')
  closeDropdowns(): void{
    this.showColorPalette = false
    this.showTextFormatDropdown = false
  }

} 
