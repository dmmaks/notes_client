import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthFormsGuard, AuthGuard} from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const noteModule = () => import('./note/note.module').then(x => x.NoteModule);

const routes: Routes = [
  { path: 'account', loadChildren: accountModule, canActivate: [AuthFormsGuard] },
  { path: 'note', loadChildren: noteModule, /*canActivate: [AuthGuard]*/ },
  { path: '**', redirectTo: '/account/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
