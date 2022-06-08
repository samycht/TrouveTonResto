import { Injectable } from '@angular/core';
import {Firestore,addDoc,collection,doc,deleteDoc} from '@angular/fire/firestore';
import { RestaurantData } from '../interfaces/restaurant-data.inerfaces';
import { AuthService } from './auth.service';
import { Picture } from 'src/app/features/dashboard/restaurant-form/Picture';
import { getStorage, ref, uploadBytes} from "firebase/storage";
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

  async delRestaurant(id:string){
    await deleteDoc(doc(this.db, "restaurants", id));
  }

  uploadPicture(picture:Picture){
    const storage = getStorage();
    
    const pictureRef = ref(storage,picture.name);
    uploadBytes(pictureRef,picture.file).then((value)=>console.log(value));


    
  }




}
