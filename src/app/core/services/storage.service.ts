import { Injectable } from '@angular/core';
import {Firestore,addDoc,collection,doc,deleteDoc,updateDoc,query,where,getDocs} from '@angular/fire/firestore';
import { RestaurantData } from '../interfaces/restaurant-data.inerfaces';
import { AuthService } from './auth.service';
import { Picture } from 'src/app/features/dashboard/restaurant-form/Picture';
import { getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private db:Firestore,
    private authService: AuthService
  ) { }

  async addRestaurant({name,description,address,city,state,zip,phone}:RestaurantData,file:File){
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
    await addDoc(collection(this.db,"restaurants"),{
      uid: this.authService.uid,
      name:name,
      description:description,
      address:address,
      city:city,
      state:state,
      zip:zip,
      phone:phone,
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




}
