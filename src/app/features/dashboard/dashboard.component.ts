import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { StorageService } from 'src/app/core/services/storage.service';
import {Firestore} from "@angular/fire/firestore";
import {Router} from '@angular/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public restaurants: any;
  uid!:string;
  constructor(
    private dial : MatDialog,
    private db : Firestore,
    private router: Router,
    public authService : AuthService,
    private data : DataService,
    private storage: StorageService,
  ) {


    //this.authService.checkLogIn()
    this.fillRest();


  }

ngOnInit(): void {

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height='80%';
    this.dial.open(RestaurantFormComponent, dialogConfig);
  }

  closeDialog(){
    this.dial.closeAll();
  }

  public auth = getAuth();
  async getRestaurantsList() {
      console.log(this.authService.uid)

      let restaurantsSnap = await this.data.getRestaurants(getAuth().currentUser!.uid);
      let restaurantsDatas =[]

      for (let i  = 0; i<restaurantsSnap.docs.length;i++){
        restaurantsDatas.push(restaurantsSnap.docs[i])
      }
      return restaurantsDatas
    }

  async fillRest(){
    this.restaurants = await this.getRestaurantsList();
  }

  show(){
    console.log(this.restaurants)
  }
}
