import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Restaurant } from 'src/app/core/class/Restaurant';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {


  form:FormGroup;
  event:any;
  constructor(private fb:FormBuilder,
              private storage: StorageService,

    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required,Validators.minLength(100)]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      zip:['',[Validators.required]],
      phone:['',[Validators.required]],
    });
  }

  get name(){
    return this.form.get('name');
  }

  get description(){
    return this.form.get('description');
  }
  get address(){
    return this.form.get('address');
  }
  get city(){
    return this.form.get('city');
  }
  get state(){
    return this.form.get('state');
  }
  get zip(){
    return this.form.get('zip');
  }
  get phone(){
    return this.form.get('phone');
  }


  submit:boolean=false;




  onSubmit(){

    let restaurant = new Restaurant(this.form.value["name"],this.form.value["description"],this.form.value["address"],this.form.value["city"],this.form.value["state"],this.form.value["zip"],this.form.value["phone"])
    this.storage.addRestaurant(restaurant,this.event.target.files[0]);
    this.form.reset();
    this.submit=true;
  }


   onFileSelected(event:any){
     return event;
  }
}
