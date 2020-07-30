import { first } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private returnUrl: string;
  public errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getReturnUrl();
  }

  private getReturnUrl(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public login(formValue) {
    this.authService.login(formValue).subscribe(
      () => this.router.navigate([this.returnUrl]),
      (error) =>
        (this.errorMessage =
          error === 'Bad Request'
            ? 'You entered invalid email or password'
            : error)
    );
  }
}
