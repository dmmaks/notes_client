import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthFormsGuard, AuthGuard} from './_helpers';
import {Role} from './_models';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const dishModule = () => import('./dish/note.module').then(x => x.DishModule);

const routes: Routes = [
  //{ path: '', redirectTo: '/account/login', pathMatch: 'full' },
  { path: '', loadChildren: accountModule, canActivate: [AuthFormsGuard] },
  { path: 'note', loadChildren: noteModule, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
