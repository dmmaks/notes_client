import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CookieStorageService } from 'src/app/_helpers/cookies.storage';
import { AlertService } from 'src/app/_services';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit,OnDestroy {
  form: FormGroup;
  destroy: ReplaySubject<any> = new ReplaySubject<any>();
  alertMessage: string;
  hide: boolean = true;

constructor(
  private formBuilder: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private cookie: CookieStorageService,
  private alertService: AlertService,
){
}
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

ngOnInit(){
  this.form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+"), Validators.minLength(5), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
  });}

get control(){return this.form.controls}

onSubmit() {
  this.alertService.clear();
  if (this.form.valid) {
    this.authService.signIn(this.control['username'].value, this.control['password'].value)
            .pipe(takeUntil(this.destroy))
            .subscribe({
                next: next => {
                  this.cookie.setToken(next.tokenValue);
                  this.router.navigateByUrl('/note/list');
              },
                error: error => {
                  switch(error.status){
                    case 400:
                      this.alertMessage = "Something went wrong";
                      break;
                      default:
                        this.alertMessage = "There was an error on the server, please try again later."
                        break;
                  }
                this.alertService.error(this.alertMessage);}
            });
  }
}

}
