import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
  setDoc
} from '@angular/fire/firestore';
import { RestaurantData } from '../class/Restaurant';
import { AuthService } from './auth.service';
import { Picture } from 'src/app/features/dashboard/restaurant-form/Picture';
import { getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage";
import { User } from 'firebase/auth';
import { user } from '@angular/fire/auth';
import {Favorite} from "../class/Favorite";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private db:Firestore,
    private auth: AuthService
  ) { }

  async addRestaurant(restaurant:RestaurantData,file:File){

    var pic:Picture  = new Picture(file);

    pic.name=file.name
    if(file){
      await this.uploadPicture(pic);
      }
    var basePath = "gs://we4b-d4903.appspot.com/"
    var gsUrl = basePath.concat(pic.name);
    const gsRef = ref(getStorage(),gsUrl);
    var dlUrl = await getDownloadURL(gsRef);
    pic.url = dlUrl;

    var currentUser = await this.auth.getUser()
    await addDoc(collection(this.db,"restaurants"),{
      uid: currentUser.uid,
      name:restaurant.name,
      description:restaurant.description,
      address:restaurant.address,
      city:restaurant.city,
      state:restaurant.state,
      zip:restaurant.zip,
      phone:restaurant.phone,
      picLink:pic.url
    }

    );


  }

  async delRestaurant(id:string){
    await deleteDoc(doc(this.db, "restaurants", id));
  }

  async uploadPicture(picture:Picture){
    const storage = getStorage();

    const pictureRef = ref(storage,picture.name);
    uploadBytes(pictureRef,picture.file).then((value)=>console.log(value));

  }


  async addFavorite(favorite:Favorite){
    await setDoc(doc(this.db, "favorites", favorite.getFavoriteid()),{
      user_id:favorite.user_id,
      restaurant_id:favorite.restaurant_id,
    })
  }

  async removeFavorite(favorite:Favorite){
    await deleteDoc(doc(this.db, "favorites", favorite.getFavoriteid()));
  }

}
