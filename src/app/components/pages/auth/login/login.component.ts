import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private returnUrl: string;
  public errorMessage: string;
  public pageIsLoading: boolean;

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
    this.pageIsLoading = true;
    this.authService
      .login(formValue)
      .pipe(delay(2000))
      .subscribe(
        () => {
          this.pageIsLoading = false;
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.pageIsLoading = false;
          this.errorMessage =
            error === 'Bad Request'
              ? 'You entered invalid email or password'
              : error;
        }
      );
  }
}
