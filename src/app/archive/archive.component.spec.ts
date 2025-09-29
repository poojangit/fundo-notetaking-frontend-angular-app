import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveComponent } from './archive.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { NoteService } from '../services/note.service';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveComponent],
      imports : [
        HttpClientTestingModule
      ],
       providers: [
        NoteService               // ✅ provide your service
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
