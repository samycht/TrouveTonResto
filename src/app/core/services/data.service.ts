import { Injectable } from '@angular/core';
import {Firestore, collection, setDoc, doc, query, where, getDocs, DocumentData, getDoc} from '@angular/fire/firestore';
import {AuthService} from '../services/auth.service'
import {Favorite} from "../class/Favorite";
import {Restaurant} from "../class/Restaurant";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private db: Firestore,
    private authService: AuthService
  ) {

  }

  getUserRestaurants(uid: string) {

    const userRests = collection(this.db, "restaurants");
    const q = query(userRests, where("uid", "==", uid));
    const querySnapshot = getDocs(q);
    return querySnapshot
  }

  getSingleRestaurant(name: string) {

    const Rests = collection(this.db, "restaurants");
    const q = query(Rests, where("name", "==", name));
    const querySnapshot = getDocs(q);
    return querySnapshot
  }

  getAllRestaurants(){
    const restCollection  = collection(this.db,"restaurants");
    return getDocs(restCollection);
  }

  searchRestaurant(keyword: string) {
    const restaurants = collection(this.db, "restaurants");
    const q = query(restaurants, where("name", ">=", keyword), where("name", "<=", keyword+ '\uf8ff'));
    const querySnapshot = getDocs(q);

    /*var results: DocumentData[] = [];
    console.log("Searching...");

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      results.push(doc.data());
    });
    */
    return querySnapshot
  }

  async isAlreadyFavorite(favorite:Favorite):Promise<boolean>{
    const docRef = doc(this.db, "favorites", favorite.getFavoriteid())
    const docSnap = await getDoc(docRef);

    console.log("isAlreadyFavorite: ",favorite.restaurant_id,favorite.user_id)

    if (docSnap.exists()) {
      return true
    } else {
      return false
    }
  }

  getFavorite(userid: string) {
    const restaurants = collection(this.db, "favorites");
    const q = query(restaurants, where("user_id", "==", userid));
    const querySnapshot = getDocs(q);

    /*var results: DocumentData[] = [];
    console.log("Searching...");

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      results.push(doc.data());
    });
    */
    return querySnapshot
  }

  getSingleRestaurantById(id: string) {
    const docRef = doc(this.db, "restaurants", id);
    const docSnap = getDoc(docRef);
    console.log("get...",docSnap)
    return docSnap
  }

  async getTheMostLikedResto() {
    const restaurants = collection(this.db, "favorites");
    const q = query(restaurants);

    var restos:[number:string]


    let favorites = new Map<string, number>();

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var resto_id = doc.data()["restaurant_id"];

      if(favorites.has(resto_id)){
        var nb = favorites.get(resto_id)!
        favorites.set(resto_id, nb+1);
      } else {
        favorites.set(resto_id, 1);
      }
    });


    var recordOflike = 0
    var bestRestoID = ""

    for (let [key, value] of favorites) {
      if(value>recordOflike){
        bestRestoID=key
        recordOflike = value
        console.log("Resto le plus liké:",key," like:",value);
      }

    }
    if(bestRestoID){
      var resto = await this.getSingleRestaurantById(bestRestoID)
      return resto
    }
    else return undefined

  }
}
