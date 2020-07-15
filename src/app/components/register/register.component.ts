import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', Validators.minLength(3)),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: boolean) => {
          const data = {
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
          };
          this.authService.login(data).subscribe(
            () => this.router.navigate(['/'])
          );
        },
        error => this.errorMessage = error
      );
    }
  }
}
