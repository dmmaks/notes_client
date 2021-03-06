import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {NoteListPageComponent} from "./note-list-page/note-list-page.component";
import { NoteInfoComponent } from './note-info/note-info.component';
import { NoteAddEditComponent } from './note-add-edit/note-add-edit.component';


const routes: Routes = [{
  path: '', component: LayoutComponent,
  children:[
     { path: '', redirectTo: 'list', pathMatch: 'full' },
     {path:'list', component: NoteListPageComponent},
     {path: 'add', component: NoteAddEditComponent},
     {path:'share/:id', component: NoteInfoComponent},
    { path: 'edit/:id', component: NoteAddEditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }
