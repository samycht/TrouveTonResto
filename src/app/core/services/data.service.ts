import { Injectable } from '@angular/core';
import {Firestore,collection,setDoc,doc, query,where, getDocs, DocumentData} from '@angular/fire/firestore';
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

  getRestaurants(uid: string) {

    const userRests = collection(this.db, "restaurants");
    const q = query(userRests, where("uid", "==", uid));
    const querySnapshot = getDocs(q);
    return querySnapshot
  }

  async searchRestaurant(keyword: string) {
    const restaurants = collection(this.db, "restaurants");
    const q = query(restaurants, where("name", "==", keyword));
    const querySnapshot = await getDocs(q);

    var results: DocumentData[] = [];
    console.log("Searching...");

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      results.push(doc.data());
    });

    return results
  }
}
