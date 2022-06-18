import { Component, Input, OnInit } from '@angular/core';
import { HomeModule } from '../../home.module';
import { DataService } from 'src/app/core/services/data.service';
import { Data } from '@angular/router';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public restaurants:any
  constructor(
    private data:DataService
  ) {
    this.fillRest();
    console.log(this.restaurants);
    console.log(getAuth().currentUser)
  }

  ngOnInit(): void {
  }

  async getRestaurantsList() {
    let restaurantsSnap = await this.data.getAllRestaurants();
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
