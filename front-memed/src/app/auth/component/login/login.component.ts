import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formSubmitAttempt: boolean;
  formLogin: any = {};
  isLoggedIn: boolean;
  errorMessage: string = null;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })

    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.formLogin.get(field).valid && this.formLogin.get(field).touched) ||
      (this.formLogin.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        res => {
          console.log("Connected successfully");
          this.errorMessage = null;
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.reason;
        }
      );
    }
    this.formSubmitAttempt = true;
  }
}
