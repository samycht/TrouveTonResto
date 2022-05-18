import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { StorageService } from 'src/app/core/services/storage.service';
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
    private authService : AuthService,
    private data : DataService,
    private storage: StorageService
    

  ) {
   
    // this.authService.checkLogIn()
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



  async getRestaurantsList() {

    this.authService.getInfo()
    this.authService.uid = this.authService.getAuth.currentUser?.uid!
    this.authService.email = this.authService.getAuth.currentUser?.email!


    let restaurantsSnap = await this.data.getRestaurants(this.authService.uid)
    let restaurantsDatas =[]

    for (let i  = 0; i<restaurantsSnap.docs.length;i++){
      restaurantsDatas.push(restaurantsSnap.docs[i])

    }

    return restaurantsDatas
  }

  public restaurants = this.getRestaurantsList()
 
  async delete(id:string){
    await  this.storage.delRestaurant(id)
    window.location.reload()
  }

}
