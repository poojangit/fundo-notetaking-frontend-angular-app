import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isExpanded: boolean = false // Controlled by parent (e.g., Header toggle)
  isHovered: boolean = false           // Internal hover state

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false
  }

  get isSidebarExpanded(): boolean {
    return this.isExpanded || this.isHovered
  }
}
