import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { NewUser } from 'src/app/core/class/NewUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {



  form:FormGroup;

  answer:string;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) { }

    ngOnInit(): void {
      this.form = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        pseudo:['',[Validators.required]],
        accountType:['',[Validators.required]]
    });

  }
  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }


  get firstName(){
    return this.form.get('firstname');
  }
  get lastName(){
    return this.form.get('lastname');
  }
  get pseudo(){
    return this.form.get('pseudo');
  }

  
  onSubmit(){
   
    let newUser= new NewUser(this.form.value["email"],this.form.value["password"],this.form.value["firstName"],this.form.value["lastName"],this.form.value["pseudo"],this.form.value["accountType"])
    this.authService.register(newUser).then(()=>this.router.navigate(['/login'])).catch((e)=>console.log(e.message));
  }
  
}