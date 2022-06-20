import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { StorageService } from 'src/app/core/services/storage.service';
import {Firestore} from "@angular/fire/firestore";
import {Router} from '@angular/router';
import { UserData } from 'src/app/core/class/UserData';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public restaurants: any;
  public userData:UserData;
  public user:User

  constructor(
    private dial : MatDialog,
    private db : Firestore,
    private router: Router,
    public auth : AuthService,
    private data : DataService,
    private storage: StorageService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.user =await this.auth.getUser()
    this.userData = await this.auth.getInfo(this.user.uid)
    this.fillRest();

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

  async getRestaurantsList() {


      let restaurantsSnap = await this.data.getUserRestaurants(this.user.uid);
      let restaurantsDatas =[]

      for (let i  = 0; i<restaurantsSnap.docs.length;i++){
        restaurantsDatas.push(restaurantsSnap.docs[i])
      }
      return restaurantsDatas
    }

  async fillRest(){
    this.restaurants = await this.getRestaurantsList();
  }

}
