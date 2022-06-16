import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewUser } from 'src/app/core/class/NewUser';
import {Router} from '@angular/router';
import { doc, addDoc ,collection} from "firebase/firestore"; 
;

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  
  ) { }


  ngOnInit(): void {
  }
 
  
}
