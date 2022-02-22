import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import { Note } from '../../_models';
import { AlertService} from '../../_services';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-note-info',
  templateUrl: './note-info.component.html',
  styleUrls: ['./note-info.component.scss'],
})
export class NoteInfoComponent implements OnInit {

  noteInfo: Note;
  destroy: ReplaySubject<any> = new ReplaySubject<any>();
  isNotFound: boolean = false;

  constructor(private noteService: NoteService, private route: ActivatedRoute, private alertService: AlertService, private router: Router) {
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id && Number(id)) {
      this.getNoteInfo(id);
    }
    else {
      this.router.navigateByUrl("/note");
    }
  }

  private getNoteInfo(id: string) : void {
    this.noteService.getSharedNote(id)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        {next: response => {
          this.noteInfo = response;
          },
          error: error => {
            this.displayError(error);
          }}
      )
  }
  
  displayError(error: any) : void {
    switch (error.status) {
      case 400:
        this.alertService.error("Something went wrong",true,true);
        break;
      case 404:
        this.isNotFound = true;
        break;
      default:
        this.alertService.error("There was an error on the server, please try again later.",true,true);
        break;
    }
    
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
