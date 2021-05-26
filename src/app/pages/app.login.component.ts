import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { StorageappService } from '../demo/service/storageapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {

  loginForm: FormGroup;

  invalidLoginCredentials: boolean;

  loading: boolean = false;

  submitted: boolean;

  constructor(private router: Router, private fb: FormBuilder, private storageApiService: StorageappService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  login() {

    console.log("Executing Login");

    this.invalidLoginCredentials = false;

    this.submitted = true;

    this.loading = true;

    if (this.loginForm.invalid) {
      //this.invalidLoginCredentials = true;
      this.loading = false;
      return;
    }

    var username = this.loginForm.get('username').value;

    var password = this.loginForm.get('password').value;

    var body = { "username": username, "password": password };

    console.log("Username:" + username);

    this.storageApiService.postLogin(JSON.stringify(body)).subscribe((data: any) => {

      if (data.statuscode === 202) {

        this.router.navigate(['/']);

      } else {
        console.log("Wrong Username or Password");
        this.invalidLoginCredentials = true;
        this.loading = false;

      }
    });


  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

}
