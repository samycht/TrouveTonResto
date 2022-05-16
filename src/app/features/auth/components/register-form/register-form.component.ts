import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {


  @Output() formData: EventEmitter<{
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    pseudo:string;
    accountType:number;
  }> = new EventEmitter();

  form:FormGroup;



  constructor(private fb:FormBuilder) { }

    ngOnInit(): void {
      this.form = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        pseudo:['',[Validators.required]],
        accountType:['',[Validators.required]],
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
  get accountType(){
    return this.form.get('accountType');
  }
  
  onSubmit(){
    this.formData.emit(this.form.value);
  }
  
}