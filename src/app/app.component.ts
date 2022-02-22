import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Note app';
  subscription: Subscription;

  constructor(
    private authService: AuthService
  ){
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }
}
