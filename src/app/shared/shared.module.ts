import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, //This is for ngModel in search bar
    RouterModule
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    SidebarComponent,
    RouterModule
  ]
})
export class SharedModule { }
