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

  ) { 
    
  }

   getRestaurants(uid:string){

    const userRests = collection(this.db, "restaurants");
    const q = query(userRests, where("uid", "==",uid));
    const querySnapshot = getDocs(q);
    return querySnapshot
  }

}
