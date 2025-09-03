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


  expand(): void {
    this.isExpanded = true
    this.closeDropdowns()
  }

  autoGrowTextArea(event: Event):void {
    const textarea = event.target as HTMLTextAreaElement
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  @HostListener('document:click')
  closeDropdowns(): void{
    // this.showColorPalette = false
    // this.showTextFormatDropdown = false
  }

} 
