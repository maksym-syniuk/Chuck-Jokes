
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage = '';
  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getReturnUrl();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private getReturnUrl(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          () => this.router.navigate([this.returnUrl]),
          error => {
            this.errorMessage = error === 'Bad Request' ? 'You entered invalid email or password' : error;
            this.loginForm.get('password').reset();
          }
        );
    }
  }
}
