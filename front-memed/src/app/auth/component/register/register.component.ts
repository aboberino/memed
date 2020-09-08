import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../../model/signup-info';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  private formSubmitAttempt: boolean;
  errorMessage: string = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.formRegister.get(field).valid && this.formRegister.get(field).touched) ||
      (this.formRegister.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.formRegister.valid) {
      console.log(this.formRegister.value);
      this.formRegister.value.avatar_url = 'https://i.pinimg.com/originals/a4/4a/f3/a44af3bb5f074e3cdb4be8a56232c996.jpg';
      this.authService.register(this.formRegister.value).subscribe(
        res => {
          this.snackBar.open("Registered successfully.", '✔', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' });
          console.log("Registered successfully");
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.reason;
        });
    }
    this.formSubmitAttempt = true;
  }

}
