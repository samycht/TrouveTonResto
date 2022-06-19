import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserData } from 'src/app/core/class/Account';
import { User } from 'firebase/auth';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
  public user:User
  public userData:UserData
  constructor(public auth:AuthService,

    ) {
    console.log(this.user)

  }

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getUser()
    this.userData = await this.auth.getInfo(this.user.uid)


  }
  logOut(){
    this.auth.logout()
  }
}
