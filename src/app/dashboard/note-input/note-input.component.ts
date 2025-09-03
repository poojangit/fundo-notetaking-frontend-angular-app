import { Component, HostListener } from '@angular/core';

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

  expand(): void {
    this.isExpanded = true
    this.closeDropdowns()
  }

  autoGrowTextArea(event: Event):void {
    const textarea = event.target as HTMLTextAreaElement
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
 toggleColorPalette(event: Event): void {
    event.stopPropagation();
    this.showColorPalette = !this.showColorPalette;
    this.showTextFormatDropdown = false;
  }

  setColor(color: string, event: Event) : void {
    event.stopPropagation()
    this.selectedColor = color
    this.showColorPalette = false
  }

  @HostListener('document:click')
  closeDropdowns(): void{
    this.showColorPalette = false
    this.showTextFormatDropdown = false
  }

} 
