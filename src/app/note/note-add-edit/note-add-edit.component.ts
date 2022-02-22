import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Note } from 'src/app/_models';
import { AlertService, NoteService} from 'src/app/_services';
import { NoteFormError } from './note-form-error';

@Component({
  selector: 'app-note-add-edit',
  templateUrl: './note-add-edit.component.html',
  styleUrls: ['./note-add-edit.component.scss']
})
export class NoteAddEditComponent extends NoteFormError implements OnInit {

destroy: ReplaySubject<any> = new ReplaySubject<any>();
note: Note;
title: string;
modeEdit: boolean = false;

  constructor(
    private dialog: MatDialog,
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    super();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.maxLength(10000), Validators.minLength(5)]],
      access: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.modeEdit = true;
      this.noteService.getSharedNote(id).pipe(takeUntil(this.destroy)).subscribe({
        next: (data: Note) => {this.note = data; this.note.uuid = id;},
        error: () => this.router.navigate(['/note/list'])
    });
    }
    else {
      this.note = { uuid: '', name: '', body: '', access: 'private' }
    }
    this.title = this.modeEdit ? "Edit note" : "Create new note";
  }

  onSubmitForm(): void {
    this.alertService.clear();
    if(this.form.valid){
      if(!this.modeEdit){
      this.noteService.createNote(this.note).pipe(takeUntil(this.destroy)).subscribe({
        next: () => {
          this.alertService.success("Note successfully added!", true, true);
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        },
        error: () => this.alertService.error("There was a server error. Please try again later.", false, false, "formNote")
      });
      }
    else {
      this.noteService.editNote(this.note).pipe(takeUntil(this.destroy)).subscribe({
        next: () => {
          this.alertService.success("Note successfully updated!", true, true);
          this.router.navigateByUrl("note/list");
        },
        error: () => this.alertService.error("There was a server error. Please try again later.", false, false, "formNote")
      });
    }
  }
  }


}