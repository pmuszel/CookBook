import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.error = null;

    let authObs : Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);     
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
    }

    authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
  
    form.reset();
  }

}
