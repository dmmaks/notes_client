import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {Observable, ReplaySubject} from "rxjs";
import {AlertService, AuthService} from "../../_services";
import {map, startWith, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Sort, SortDirection } from '@angular/material/sort';
import { Note } from 'src/app/_models';
import { NoteService } from 'src/app/_services/note.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dish-list-page',
  templateUrl: './note-list-page.component.html',
  styleUrls: ['./note-list-page.component.scss']
})
export class NoteListPageComponent {
  pageContent: Note[] = [];
  destroy: ReplaySubject<any> = new ReplaySubject<any>();
  columnsToDisplay = ['name', 'content', 'access', 'actions'];
  alertMessage: string;
  serverUrl: string = `${environment.serverUrl}`;

  constructor(
    private noteService: NoteService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }
  

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotes()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        {next: response => {
          response.forEach( x => {
            this.pageContent.push(x);
          })
          },
          error: error => {
            this.displayError(error);
          }}
      )
  }

  confirmDelete(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.noteService.deleteNote(id)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          this.alertService.success("Note deleted",true,true);
          this.getNotes();
        },
        error: error => {
          this.displayError(error);
        }
      });
      }
    });
  }

  copyNoteLink(id: string): string {
    return this.serverUrl + '/share/' + id;
  }

  displayError(error: any) : void {
    switch (error.status) {
      case 400:
        this.alertMessage = "Something went wrong";
        break;
      case 404:
        this.alertMessage = error.error.message;
        break;
      default:
        this.alertMessage = "There was an error on the server, please try again later."
        break;
    }
    this.alertService.error(this.alertMessage,true,true);
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}

