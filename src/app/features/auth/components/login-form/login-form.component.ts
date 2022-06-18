import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { RegisteredUser } from 'src/app/core/class/RegisteredUser';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  
  form:FormGroup;

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    });
  }


  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  onSubmit(){
    let registeredUser=new RegisteredUser(this.form.value["email"],this.form.value["password"])
    this.authService.login(registeredUser).then(()=>this.router.navigate(['/home'])).catch((e)=>console.log(e.message));
  }
}
