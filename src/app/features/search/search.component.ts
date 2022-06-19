import { Component, OnInit } from '@angular/core';
import {DataService} from "../../core/services/data.service";
import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {DocumentData} from "@angular/fire/firestore";
import {AuthService} from "../../core/services/auth.service";
import {User} from "firebase/auth";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  title = 'angular-text-search-highlight';
  searchText = '';
  public restaurantsList: any = [];
  public user: User;
  public userid: string = '';

  constructor(private data: DataService,
              public auth : AuthService,) {
    this.fillRest();
    console.log(this.restaurantsList);
  }

  ngOnInit(): void {
  }

  async onKey(event: any) {
    console.log("CHANGE", event.target.value);
    await this.fillRest();
    console.log(this.restaurantsList.length);
  }

  async getRestaurantsList() {
    let restaurantsSnap = await this.data.searchRestaurant(this.searchText);
    let restaurantsDatas =[]

    for (let i  = 0; i<restaurantsSnap.docs.length;i++){
      restaurantsDatas.push(restaurantsSnap.docs[i])
    }
    return restaurantsDatas
  }

  async fillRest(){
    this.restaurantsList  = await this.getRestaurantsList();
    this.user = await this.auth.getUser()
    this.userid = this.user.uid
    console.log("userid:",this.userid)
  }
}
