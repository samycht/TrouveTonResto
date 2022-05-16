import { Injectable } from '@angular/core';
import {Firestore,addDoc,collection} from '@angular/fire/firestore';
import { RestaurantData } from '../interfaces/restaurant-data.inerfaces';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private db:Firestore,
    private authService: AuthService
  ) { }

  async addRestaurant({name,description,address,city,state,zip,phone}:RestaurantData){
    return await addDoc(collection(this.db,"restaurants"),{
      uid: this.authService.uid,
      name:name,
      description:description,
      address:address,
      city:city,
      state:state,
      zip:zip,
      phone:phone
    }
    
    );
    
  }
}
