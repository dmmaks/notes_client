import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DishRoutingModule} from "./note-routing.module";
import { NoteListPageComponent } from './note-list-page/note-list-page.component';
import {LayoutComponent} from "./layout/layout.component";
import {SharedModule} from "../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { NoteInfoComponent } from './note-info/note-info.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { NoteAddEditComponent } from './note-add-edit/note-add-edit.component';
import { MatButton } from '@angular/material/button';



@NgModule({
  declarations: [
    LayoutComponent,
    NoteListPageComponent,
    DeleteConfirmationComponent,
    NoteInfoComponent,
    NoteAddEditComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    SharedModule,
    DishRoutingModule,
    MatDialogModule,
    ClipboardModule
  ],
})
export class NoteModule { }
