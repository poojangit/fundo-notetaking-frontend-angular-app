import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  // 🔄 Sidebar state toggling
  sidebarExpanded: boolean = false

  ngOnInit(): void {
    console.log('✅ Dashboard initialized');
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
}
