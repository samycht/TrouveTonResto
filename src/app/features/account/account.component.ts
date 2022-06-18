import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../core/services/auth.service";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserData } from 'src/app/core/class/Account';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  public user:User
  public userData:UserData
  constructor(public auth:AuthService,
          
    ) {

        
  }

  async ngOnInit(): Promise<void> {
    this.user =await this.auth.getUser()
    this.userData = await this.auth.getInfo(this.user.uid)
   

  }


  

  
}


