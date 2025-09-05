import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
     // 🔍 Two-way binding from the search bar
     searchQuery: string = ''

     // 🔄 Toggle between grid and list view
     isGridView: boolean = true

     // 👤 Controls the profile popup visibility
      showProfilePopup: boolean = false
      isSidebarExpanded = false

     profilePic: string = "https://www.gravatar.com/avatar?d=mp"
     userName: string = ''
     userEmail: string = ''

     
    // 🔁 Events to inform parent components like Dashboard
     @Output() viewModeChanged = new EventEmitter<boolean>();
 
     /**
      * 🧠 toggleSidebar()
      * Emits event to parent to open/close the sidebar (dashboard)
      */
     @Output() menuToggle = new EventEmitter<boolean>();
     @Output() searchTermChanged = new EventEmitter<string>

     constructor(private router : Router){}
     ngOnInit(): void {
         this.userName = localStorage.getItem('firstName') || 'User' 
         this.userEmail = localStorage.getItem('email') || 'user@example.com'    
        // profilePic can be updated if API returns one
      }

      toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded
        this.menuToggle.emit(this.isSidebarExpanded)
      }
      /**
      * 🔄 toggleView()
      * Switches between Grid and List, and tells parent to update
      */
     toggleView() {
      this.isGridView = !this.isGridView
      this.viewModeChanged.emit(this.isGridView)
     }

     /**
      * 👤 toggleProfilePopup()
      * Shows or hides the profile popup
      */
     toggleProfilePopup() {
      this.showProfilePopup = !this.showProfilePopup
     }

     /**
      * 🔓 logout()
      * For now, just emits logout event — we'll later connect it to AuthService
      */
     logout() {
      localStorage.clear()
      this.showProfilePopup = false
      this.router.navigate(['/login'])
     }

     onAddAccount() {
      this.router.navigate(['/login']) // reuse login route
     }

    onSearch(event: any) {
      this.searchTermChanged.emit(event.target.value.toLowerCase().trim());
    }

     @HostListener('document:click', ['$event'])
     closePopupOnOutsideClick(event:Event){
        const clickedInside = (event.target as HTMLElement).closest('.profile-wrapper')
        if(!clickedInside){
          this.showProfilePopup = false
        }
     }
}
