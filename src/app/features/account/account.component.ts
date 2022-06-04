import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public auth:AuthService) {
    this.asyncgetInfo();
  }

  ngOnInit(): void {

  }

  async asyncgetInfo(){
    await this.auth.getInfo()

    console.log(this.auth)
  }

}
