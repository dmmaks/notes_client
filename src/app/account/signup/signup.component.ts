import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { User } from 'src/app/_models/user';
import { AlertService, AuthService } from 'src/app/_services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  destroy: ReplaySubject<any> = new ReplaySubject<any>();
  alertMessage: string;
  hide: boolean = true;
  hideConfirm: boolean = true;
  form: FormGroup;

  get control() {
    return this.form.controls;
  }

constructor(
  private formBuilder: FormBuilder,
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router,
  private alertService: AlertService
){
  this.form = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+"), Validators.minLength(5), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  } as AbstractControlOptions
  );
}
  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

onSubmit(): void {
  this.alertService.clear();
  if (this.form.valid) {
    const user: User = {username: this.form.value.userName, password: this.form.value.password};
    this.authService.signUp(user)
            .pipe(takeUntil(this.destroy))
            .subscribe({
              next: () => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['../signin'], { relativeTo: this.route });
              },
                error: error => {
                  switch(error.status){
                    case 400:
                      this.alertMessage = "Somethig went wrong";
                      break;
                    default:
                        this.alertMessage = "There was an error on the server, please try again later."
                        break;
                  }
                  this.alertService.error(this.alertMessage);
            }});
    }
  }

  

  get confirmPasswordErrorMessage(): string {
    return this.control['confirmPassword'].hasError('required') ?
      'Enter your password, please' :
      this.control['confirmPassword'].hasError('mustMatch') ?
        'Passwords do not match' : '';
  }

}
