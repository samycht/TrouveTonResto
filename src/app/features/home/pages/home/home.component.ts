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
  public theMostLikedResto:any
  public indextheMostLikedResto:number

  constructor(
    private data:DataService
  ) {


  }

  ngOnInit(): void {
    this.getTHERest();
  }

  async getRestaurantsList() {
    let restaurantsSnap = await this.data.getAllRestaurants();
    let restaurantsDatas = []


    for (let i  = 0; i<restaurantsSnap.docs.length;i++){
      if(restaurantsSnap.docs[i].id == this.theMostLikedResto.id){
        console.log("if  ", restaurantsSnap.docs[i].id, this.theMostLikedResto.id)
        this.indextheMostLikedResto = i;
      } else {
        console.log("else ", restaurantsSnap.docs[i].id, this.theMostLikedResto.id)
      }
        restaurantsDatas.push(restaurantsSnap.docs[i])
    }
    console.log("restaurantsDatas.length,",restaurantsDatas.length)
    return restaurantsDatas
  }

  async fillRest(){
    this.restaurants = await this.getRestaurantsList();
  }

  async getTHERest() {
    this.theMostLikedResto =  await this.data.getTheMostLikedResto();

    console.log("gettheresto: ",this.theMostLikedResto.data()['uid']);

    this.fillRest();
    return this.theMostLikedResto
  }
}
