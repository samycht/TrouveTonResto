import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import {Firestore} from "@angular/fire/firestore";
import {Router} from '@angular/router'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dial : MatDialog,
    private db : Firestore,
    private router: Router,
    public authService : AuthService,
    private data : DataService
  ) {

    this.authService.checkLogIn()
    this.authService.uid = this.authService.getAuth.currentUser?.uid!
    this.authService.email = this.authService.getAuth.currentUser?.email!
    this.authService.getInfo()
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dial.open(RestaurantFormComponent, dialogConfig);
  }

  closeDialog(){
    this.dial.closeAll();
  }

  async getRestaurantsList(){
    let restaurantsSnap = await this.data.getRestaurants()
    let restaurantsDatas =[]
    for (let i  = 0; i<restaurantsSnap.docs.length;i++){
      restaurantsDatas.push(restaurantsSnap.docs[i].data())
    }
    return restaurantsDatas
  }

  public restaurantsDatas = this.getRestaurantsList()
}
