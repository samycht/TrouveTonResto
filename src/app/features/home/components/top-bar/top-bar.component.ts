import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit(): void {
  }
  logOut(){
    this.auth.logout()
  }
}
