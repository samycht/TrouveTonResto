import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import {RegisterData} from 'src/app/core/interfaces/register-data.interfaces';
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
 register(data: RegisterData):void {

    this.authService.register(data).then(()=>this.router.navigate(['/login'])).catch((e)=>console.log(e.message));
  

  }
  
}
