import { Injectable } from '@angular/core';
import {Firestore,collection,setDoc,doc, query,where, getDocs} from '@angular/fire/firestore';
import {AuthService} from '../services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private db: Firestore,
    private authService: AuthService

  ) { }

  async getRestaurants(){
    
    const userRests = collection(this.db, "restaurants");
    const q = query(userRests, where("uid", "==", this.authService.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot
    
  }

}
