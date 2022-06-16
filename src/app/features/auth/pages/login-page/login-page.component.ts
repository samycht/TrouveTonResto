import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {RegisteredUser} from 'src/app/core/class/RegisteredUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }


  ngOnInit(): void {
  }

  login(user: RegisteredUser):void {
  
  
  }
}
