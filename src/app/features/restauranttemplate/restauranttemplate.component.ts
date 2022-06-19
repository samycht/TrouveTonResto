import {Component, HostListener, Input, OnInit} from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import {Favorite} from "../../core/class/Favorite";
import {user} from "@angular/fire/auth";
import {AuthService} from "../../core/services/auth.service";
import {DataService} from "../../core/services/data.service";
import {User} from "firebase/auth";
@Component({
  selector: 'app-restauranttemplate',
  templateUrl: './restauranttemplate.component.html',
  styleUrls: ['./restauranttemplate.component.css']
})
export class RestauranttemplateComponent implements OnInit {

  @Input()public res:any
  @Input()public del:boolean
  @Input()public userId:string
  @Input()public user:User
  @Input()public userIdHere:boolean
  @Input()public home:boolean
  @Input()public favPage:boolean

  public liked:boolean
  public likedString: string = "J'aime";
  public likeUrl: string;

  constructor(
    private storage:StorageService,
    private data:DataService
  ) {

  }

  async ngOnInit(): Promise<void> {
    if(this.userIdHere){
      while(this.userId.length==0){
        console.log("userid undefined")
      }
      this.checkLike();
      console.log("constructor: ",this.userId," ",this.res.uid)
    }
  }

  async delete(id:string){
    await this.storage.delRestaurant(id)
    window.location.reload()
  }

  async like(){
    let favorite = new Favorite(this.userId, this.res.id)
    console.log("like()",this.userId, this.res.id,this.liked);
    if(this.liked){
      await this.storage.removeFavorite(favorite)
      //this.liked = false
    } else {
      await this.storage.addFavorite(favorite)
      //this.liked = true
    }
    this.checkLike();
    this.likeString();
    if(this.favPage){
      window.location.reload();
    }
  }

  async checkLike() {
    let favorite = new Favorite(this.userId,this.res.id)
    this.liked = await this.data.isAlreadyFavorite(favorite)

    console.log("checkLike()",this.liked);

    this.likeString();
  }

  likeString(){
    if(this.liked){
      this.likedString= "J'aime"
      this.likeUrl = "assets/liked.png"
    }
    else{
      this.likedString ="J'aime pas"
      this.likeUrl = "assets/notliked.png"
    }
  }

  /*@HostListener('document:mousemove', ['$event'])
  onMouseMove() {
    this.checkLike();
  }*/
}
