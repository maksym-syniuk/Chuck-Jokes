import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  public register(formValue) {
    console.log(formValue);
    this.authService.register(formValue).subscribe(
      () => {
        const data = {
          email: formValue.email,
          password: formValue.password,
        };
        // login after registration
        this.authService
          .login(data)
          .subscribe(() => this.router.navigate(['/']));
      },
      (error) =>
        (this.errorMessage =
          error === 'Bad Request' ? 'Oops, some error occured :(' : error)
    );
  }
}
