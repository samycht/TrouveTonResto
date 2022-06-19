import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from "../../core/services/data.service";
import {AuthService} from "../../core/services/auth.service";
import {User} from "firebase/auth";
import {UserData} from "../../core/class/Account";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  public restaurants: any;

  public restaurantsList: any = [];
  public user: User;
  public userid: string = '';
  private userData: UserData;

  constructor(private data: DataService,
              public auth : AuthService,) {
  }

  async ngOnInit(): Promise<void> {
    this.user =await this.auth.getUser()
    this.userData = await this.auth.getInfo(this.user.uid)
    this.userid = this.user.uid
    this.fillRest();
  }

  async getRestaurantsList() {
    let favoritesSnap = await this.data.getFavorite(this.userid);
    let favoritesDatas =[]
    let restoDatas =[]

    console.log("favoritesSnap",favoritesSnap.size)

    for (let i  = 0; i<favoritesSnap.docs.length;i++){
      favoritesDatas.push(favoritesSnap.docs[i])
      console.log(" favoritesDatas.push(favoritesSnap.docs[i])", favoritesSnap.docs[i].data())
    }

    console.log("favoritesDatas",favoritesDatas[0].data())


    for (let i  = 0; i<favoritesDatas.length;i++){
      var resto = await this.data.getSingleRestaurantById(favoritesDatas[i].data()["restaurant_id"])
      restoDatas.push(resto)
      console.log("favoritesDatas[i].data()[\"restaurant_id\"]",favoritesDatas[i].data()["restaurant_id"],"  resto",resto.data())
    }
    console.log("restoDatas",restoDatas.length)

    return restoDatas
  }

  async fillRest(){
    this.restaurantsList = await this.getRestaurantsList();
  }
}
